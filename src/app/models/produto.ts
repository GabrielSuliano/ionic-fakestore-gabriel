/* Modelo usado dentro da aplicação com nomes em português. */
export interface AvaliacaoProduto {
  nota: number;
  quantidade: number;
}

/* Estrutura principal do produto exibido nas telas. */
export interface Produto {
  identificador: number;
  titulo: string;
  preco: number;
  descricao: string;
  categoria: string;
  imagem: string;
  avaliacao: AvaliacaoProduto;
}

/* Modelo da resposta original da FakeStore API. */
export interface ProdutoApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
