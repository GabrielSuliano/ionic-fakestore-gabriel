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
