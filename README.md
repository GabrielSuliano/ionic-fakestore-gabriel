# Ionic FakeStore API - Gabriel Suliano

Aplicativo Ionic 8 com Angular standalone, template de abas e consumo da FakeStore API:

`https://fakestoreapi.com/products`

## Dados do aluno

- Nome: Gabriel Suliano
- Turma: ADS0101M
- Unidade: CG
- Turno: Manha
- Palavra-chave: sera informada pelo professor na faculdade

## O que foi implementado

- Tab 1: card de identificacao com nome, turma, unidade, turno, palavra-chave e foto do aluno em `src/assets`.
- Tab 2: exibicao de produtos um por um, com botoes `Proximo` e `Anterior` desabilitados no final/inicio da lista.
- Tab 3: botao para apresentar todos os produtos e botao para suprimir a lista da tela.
- Servico Angular em `src/app/services/produtos.service.ts` consumindo apenas os produtos da FakeStore API.
- Uso de componentes Ionic como `IonCard`, `IonButton`, `IonInput`, `IonSelect`, `IonTabs` e `routerDirection`.
- CSS Custom Properties em `src/styles.scss`.
- PDF de entrega com prints das 3 telas na pasta `entrega/`.

## Como baixar e abrir no VS Code

1. Clonar o repositorio:

```bash
git clone https://github.com/GabrielSuliano/ionic-fakestore-gabriel.git
```

2. Entrar na pasta do projeto:

```bash
cd ionic-fakestore-gabriel
```

3. Abrir no VS Code:

```bash
code .
```

## Como instalar as dependencias

O projeto nao envia a pasta `node_modules`, entao e necessario instalar as dependencias depois de baixar:

```bash
npm install
```

## Como executar no navegador

Opcao 1, usando o script do projeto:

```bash
npm start
```

Opcao 2, usando Ionic CLI via `npx`:

```bash
npx ionic serve
```

Depois abra o endereco mostrado no terminal, normalmente:

`http://localhost:8100`

## Como gerar build web

```bash
npm run build
```

O build sera gerado na pasta `www/`.

## Onde esta o PDF da entrega

O PDF com os prints das telas esta em:

`entrega/entrega-gabriel-suliano.pdf`

Tambem ha os prints separados:

- `entrega/tab1-identificacao.png`
- `entrega/tab2-produto-individual.png`
- `entrega/tab3-lista-produtos.png`

## Arquivos principais para avaliacao

- `src/app/pages/aba-inicial/aba-inicial.page.*`
- `src/app/pages/produto-individual/produto-individual.page.*`
- `src/app/pages/lista-produtos/lista-produtos.page.*`
- `src/app/pages/tabs/tabs.page.*`
- `src/app/services/produtos.service.ts`
- `src/app/models/produto.ts`
- `src/styles.scss`

## Observacao sobre APK

O enunciado tambem pede apresentacao do app instalado em Android. Para gerar APK, e necessario ter Android Studio, Android SDK e Java configurados na maquina. O projeto ja possui configuracoes do Capacitor, mas a pasta nativa Android nao foi enviada no GitHub porque esta no `.gitignore`.
