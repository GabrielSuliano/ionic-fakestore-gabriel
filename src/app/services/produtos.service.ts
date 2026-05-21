import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { Produto, ProdutoApi } from '../models/produto';

/* Serviço responsável por consumir a FakeStore API e guardar os produtos. */
@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  /* Endereço da API exigida no trabalho. */
  private readonly enderecoApi: string = environment.enderecoProdutos;

  /* Array interno que armazena os produtos depois da primeira requisição. */
  private produtosArmazenados: Produto[] = [];

  /* Injeção do HttpClient para realizar requisições HTTP. */
  public constructor(private http: HttpClient) {}

  /* Carrega os produtos da API e evita requisição repetida se os dados já existirem. */
  public async carregarProdutos(): Promise<Produto[]> {
    if (this.produtosArmazenados.length > 0) {
      return this.produtosArmazenados;
    }

    /* Requisição GET para buscar somente produtos da FakeStore API. */
    const respostaApi: ProdutoApi[] = await firstValueFrom(this.http.get<ProdutoApi[]>(this.enderecoApi));

    /* Conversão dos nomes vindos da API para nomes em português usados na aplicação. */
    const produtosConvertidos: Produto[] = this.converterProdutosDaApi(respostaApi);

    /* Armazenamento da lista em memória, como pedido no enunciado. */
    this.produtosArmazenados = produtosConvertidos;

    return this.produtosArmazenados;
  }

  /* Retorna a lista já armazenada no serviço. */
  public obterProdutosArmazenados(): Produto[] {
    return this.produtosArmazenados;
  }

  /* Monta uma lista de categorias únicas a partir dos produtos carregados. */
  public obterCategorias(produtos: Produto[]): string[] {
    const categorias: string[] = [];

    for (let indiceProduto: number = 0; indiceProduto < produtos.length; indiceProduto++) {
      const produtoAtual: Produto = produtos[indiceProduto];
      const categoriaJaExiste: boolean = categorias.includes(produtoAtual.categoria);

      if (!categoriaJaExiste) {
        categorias.push(produtoAtual.categoria);
      }
    }

    return categorias;
  }

  /* Filtra produtos por texto e categoria sem usar arrow function. */
  public filtrarProdutos(produtos: Produto[], textoBusca: string, categoriaSelecionada: string): Produto[] {
    const produtosFiltrados: Produto[] = [];
    const textoNormalizado: string = textoBusca.trim().toLowerCase();

    for (let indiceProduto: number = 0; indiceProduto < produtos.length; indiceProduto++) {
      const produtoAtual: Produto = produtos[indiceProduto];
      const tituloNormalizado: string = produtoAtual.titulo.toLowerCase();
      const categoriaNormalizada: string = produtoAtual.categoria.toLowerCase();
      const descricaoNormalizada: string = produtoAtual.descricao.toLowerCase();
      const textoFoiEncontrado: boolean = textoNormalizado.length === 0 || tituloNormalizado.includes(textoNormalizado) || categoriaNormalizada.includes(textoNormalizado) || descricaoNormalizada.includes(textoNormalizado);
      const categoriaFoiEncontrada: boolean = categoriaSelecionada === 'todas' || produtoAtual.categoria === categoriaSelecionada;

      if (textoFoiEncontrado && categoriaFoiEncontrada) {
        produtosFiltrados.push(produtoAtual);
      }
    }

    return produtosFiltrados;
  }

  /* Converte cada produto da API para o modelo Produto usado nas páginas. */
  private converterProdutosDaApi(respostaApi: ProdutoApi[]): Produto[] {
    const produtosConvertidos: Produto[] = [];

    for (let indiceProduto: number = 0; indiceProduto < respostaApi.length; indiceProduto++) {
      const produtoApi: ProdutoApi = respostaApi[indiceProduto];

      const produtoConvertido: Produto = {
        identificador: produtoApi.id,
        titulo: produtoApi.title,
        preco: produtoApi.price,
        descricao: produtoApi.description,
        categoria: produtoApi.category,
        imagem: produtoApi.image,
        avaliacao: {
          nota: produtoApi.rating.rate,
          quantidade: produtoApi.rating.count
        }
      };

      produtosConvertidos.push(produtoConvertido);
    }

    return produtosConvertidos;
  }
}
