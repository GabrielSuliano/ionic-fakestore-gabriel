# Ionic FakeStore Gabriel

Aplicativo Ionic com Angular standalone criado para atividade de Desenvolvimento Mobile. O app consome a FakeStore API e organiza a entrega em abas com identificacao do aluno, visualizacao individual de produtos e listagem completa.

## Recursos

- Aba inicial com dados do aluno e foto.
- Aba de produto individual com navegacao anterior/proximo.
- Aba de lista completa com exibicao e ocultacao dos produtos.
- Service Angular para consumo da FakeStore API.
- Modelo `Produto` tipado em TypeScript.
- Prints e PDF de entrega na pasta `entrega/`.

## Stack

- Ionic 8
- Angular 18
- TypeScript
- Capacitor 6
- FakeStore API

## Como rodar

```bash
npm install
npm start
```

Normalmente o Ionic abre em:

```text
http://localhost:8100
```

Tambem e possivel rodar com:

```bash
npx ionic serve
```

## Build

```bash
npm run build
```

O build web e gerado na pasta `www/`.

## Arquivos principais

```text
src/app/pages/aba-inicial/
src/app/pages/produto-individual/
src/app/pages/lista-produtos/
src/app/pages/tabs/
src/app/services/produtos.service.ts
src/app/models/produto.ts
```

## Entrega

```text
entrega/entrega-gabriel-suliano.pdf
entrega/tab1-identificacao.png
entrega/tab2-produto-individual.png
entrega/tab3-lista-produtos.png
```

## Status

Projeto academico funcional, com consumo de API externa e navegacao em abas.

## Arquitetura e dados

Rotas standalone em `src/app/app.routes.ts` carregam três abas. `ProdutosService` consulta `environment.enderecoProdutos` com HttpClient, converte para o modelo `Produto` e mantém cache em memória. Busca textual/categorias operam sobre os produtos carregados; o cache se perde ao recarregar.

Não há API própria, banco, login, carrinho ou pagamento. É exercício de consumo de API pública. A URL fica em `src/environments/environment.ts`, sem loader `.env`.

## Reprodutibilidade e testes

`package.json` fixa Angular 18.2.13, Ionic 8.4.3, Capacitor 6.2.0. Use Node compatível com Angular 18 e `npm ci`. `start`/`build` invocam `ionic`, mas `@ionic/cli` não está em devDependencies; configure uma CLI Ionic compatível separadamente, ou use a CLI Angular local: `npm run ng -- serve` e `npm run ng -- build`. Porta 8100 refere-se ao Ionic; `ng serve` normalmente usa 4200.

Não há script `test`, suíte ou deploy confirmado. `entrega/` contém evidências da atividade, não geradas nesta auditoria. Prioridades: CLI reproduzível e testes de erro/cache/filtros. Não há licença versionada.
