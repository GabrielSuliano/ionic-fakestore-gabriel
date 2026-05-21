# Aplicativo Ionic Standalone - FakeStore API

Projeto Ionic com Angular standalone, estrutura de abas e consumo da FakeStore API.

## O que já está pronto

- Aba 1: cartão de identificação com nome, turma, unidade, turno, palavra-chave e foto em `assets`.
- Aba 2: lista de produtos um por um, com botão anterior e próximo desabilitados no início/fim da lista.
- Aba 3: botão para exibir todos os produtos e outro botão para suprimir a lista.
- Serviço próprio para consumir `https://fakestoreapi.com/products` e armazenar os produtos em array de objetos.
- Código sem arrow functions.
- Variáveis principais em português.
- Blocos comentados nos arquivos principais.
- Uso de IonCard, IonButton, IonInput, IonSelect, IonTabs e CSS Custom Properties.

## Onde editar seus dados

Abra o arquivo:

`src/app/pages/aba-inicial/aba-inicial.page.ts`

Altere os valores abaixo:

```ts
public nomeCompleto: string = 'SEU NOME COMPLETO';
public turma: string = 'ADS0301M';
public unidade: string = 'CG';
public turno: string = 'Manhã';
public palavraChave: string = 'PALAVRA-CHAVE DO PROFESSOR';
public caminhoFoto: string = 'assets/foto-aluno.svg';
```

## Onde colocar sua foto

A foto provisória está em:

`src/assets/foto-aluno.svg`

Você pode substituir por uma foto sua, por exemplo:

`src/assets/minha-foto.jpg`

Depois atualize o caminho em `aba-inicial.page.ts`:

```ts
public caminhoFoto: string = 'assets/minha-foto.jpg';
```

## Rodar no navegador

```bash
npm install
ionic serve
```

## Gerar Android/APK

Veja também o passo a passo enviado na conversa.
