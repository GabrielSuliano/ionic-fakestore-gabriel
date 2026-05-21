import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const raizProjeto = resolve('.');
const pastaSaida = join(raizProjeto, 'entrega');
const pastaPerfil = join(raizProjeto, '.chrome-captura');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const porta = 9223;
const baseUrl = process.env.APP_URL || 'http://localhost:8100';
const repositorioGitHub = process.env.REPO_URL || 'a preencher apos publicacao';

await mkdir(pastaSaida, { recursive: true });
await rm(pastaPerfil, { recursive: true, force: true });

const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${porta}`,
  `--user-data-dir=${pastaPerfil}`,
  '--no-first-run',
  '--disable-gpu',
  '--hide-scrollbars',
  'about:blank'
], { stdio: 'ignore' });

function esperar(ms) {
  return new Promise(function (resolvePromise) {
    setTimeout(resolvePromise, ms);
  });
}

async function buscarJson(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes);
  if (!resposta.ok) {
    throw new Error(`Falha em ${url}: ${resposta.status}`);
  }
  return resposta.json();
}

async function esperarChrome() {
  for (let tentativa = 0; tentativa < 40; tentativa++) {
    try {
      await buscarJson(`http://127.0.0.1:${porta}/json/version`);
      return;
    } catch {
      await esperar(250);
    }
  }

  throw new Error('Chrome headless nao iniciou a tempo.');
}

class ClienteCdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pendentes = new Map();
    this.eventos = new Map();
  }

  async conectar() {
    await new Promise((resolvePromise, rejeitar) => {
      this.ws.addEventListener('open', resolvePromise, { once: true });
      this.ws.addEventListener('error', rejeitar, { once: true });
    });

    this.ws.addEventListener('message', (evento) => {
      const mensagem = JSON.parse(evento.data);

      if (mensagem.id && this.pendentes.has(mensagem.id)) {
        const pendente = this.pendentes.get(mensagem.id);
        this.pendentes.delete(mensagem.id);

        if (mensagem.error) {
          pendente.rejeitar(new Error(mensagem.error.message));
        } else {
          pendente.resolver(mensagem.result);
        }

        return;
      }

      const ouvintes = this.eventos.get(mensagem.method) || [];
      for (const ouvinte of ouvintes) {
        ouvinte(mensagem.params);
      }
    });
  }

  enviar(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));

    return new Promise((resolver, rejeitar) => {
      this.pendentes.set(id, { resolver, rejeitar });
    });
  }

  umaVez(method) {
    return new Promise((resolver) => {
      const ouvinte = (params) => {
        const lista = this.eventos.get(method) || [];
        this.eventos.set(method, lista.filter((item) => item !== ouvinte));
        resolver(params);
      };

      const lista = this.eventos.get(method) || [];
      lista.push(ouvinte);
      this.eventos.set(method, lista);
    });
  }

  fechar() {
    this.ws.close();
  }
}

async function novaPagina() {
  const alvo = await buscarJson(`http://127.0.0.1:${porta}/json/new?about:blank`, { method: 'PUT' });
  const cliente = new ClienteCdp(alvo.webSocketDebuggerUrl);
  await cliente.conectar();
  await cliente.enviar('Page.enable');
  await cliente.enviar('Runtime.enable');
  await cliente.enviar('Network.enable');
  await cliente.enviar('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true
  });
  return cliente;
}

async function navegar(cliente, url) {
  const carregou = cliente.umaVez('Page.loadEventFired');
  await cliente.enviar('Page.navigate', { url });
  await carregou;
}

async function capturar(nomeArquivo, url, preparar) {
  const cliente = await novaPagina();
  await navegar(cliente, url);
  await esperar(3500);

  if (preparar) {
    await preparar(cliente);
  }

  await esperar(1500);
  const imagem = await cliente.enviar('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false
  });

  const caminho = join(pastaSaida, nomeArquivo);
  await writeFile(caminho, Buffer.from(imagem.data, 'base64'));
  cliente.fechar();
  return { caminho, base64: imagem.data };
}

await esperarChrome();

const prints = [];
prints.push(await capturar('tab1-identificacao.png', `${baseUrl}/tabs/aba-inicial`));
prints.push(await capturar('tab2-produto-individual.png', `${baseUrl}/tabs/produto-individual`));
prints.push(await capturar('tab3-lista-produtos.png', `${baseUrl}/tabs/lista-produtos`, async function (cliente) {
  const posicaoBotao = await cliente.enviar('Runtime.evaluate', {
    expression: `
      (() => {
        const botao = Array.from(document.querySelectorAll('ion-button'))
          .find((item) => item.innerText.includes('APRESENTAR TODOS OS PRODUTOS') || item.innerText.includes('Apresentar todos os produtos'));
        const rect = botao.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })();
    `,
    returnByValue: true
  });

  const { x, y } = posicaoBotao.result.value;
  await cliente.enviar('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await cliente.enviar('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  await esperar(5000);
}));

const html = `
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Entrega - Gabriel Suliano</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 28px; color: #111; }
    h1 { font-size: 22px; margin: 0 0 10px; }
    h2 { font-size: 16px; margin: 24px 0 10px; }
    p { margin: 4px 0; font-size: 12px; }
    a { color: #0645ad; text-decoration: underline; }
    .quebra { break-after: page; }
    img { width: 390px; max-width: 100%; border: 1px solid #bbb; display: block; }
  </style>
</head>
<body>
  <h1>Aplicativo Ionic FakeStore API</h1>
  <p><strong>Aluno:</strong> Gabriel Suliano</p>
  <p><strong>Turma:</strong> ADS0101M</p>
  <p><strong>Unidade:</strong> CG</p>
  <p><strong>Periodo:</strong> Manha</p>
  <p><strong>Palavra-chave:</strong> ______________________________</p>
  <p><strong>Repositorio GitHub:</strong> <a href="${repositorioGitHub}">${repositorioGitHub}</a></p>

  <div class="quebra">
    <h2>Tab 1 - Tela Inicial</h2>
    <img src="data:image/png;base64,${prints[0].base64}" alt="Tab 1">
  </div>
  <div class="quebra">
    <h2>Tab 2 - Produto Individual</h2>
    <img src="data:image/png;base64,${prints[1].base64}" alt="Tab 2">
  </div>
  <div>
    <h2>Tab 3 - Lista de Produtos</h2>
    <img src="data:image/png;base64,${prints[2].base64}" alt="Tab 3">
  </div>
</body>
</html>
`;

const paginaPdf = await novaPagina();
await navegar(paginaPdf, `data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
await esperar(1000);
const pdf = await paginaPdf.enviar('Page.printToPDF', {
  printBackground: true,
  preferCSSPageSize: false,
  paperWidth: 8.27,
  paperHeight: 11.69,
  marginTop: 0.4,
  marginBottom: 0.4,
  marginLeft: 0.4,
  marginRight: 0.4
});
const caminhoPdf = join(pastaSaida, 'entrega-gabriel-suliano.pdf');
await writeFile(caminhoPdf, Buffer.from(pdf.data, 'base64'));
paginaPdf.fechar();

chrome.kill();
console.log(caminhoPdf);
