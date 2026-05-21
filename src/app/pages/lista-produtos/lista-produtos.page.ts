import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Produto } from '../../models/produto';
import { ProdutosService } from '../../services/produtos.service';

/* Tela que apresenta todos os produtos em formato de lista. */
@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonInput, IonItem, IonLabel, IonBadge, IonSpinner, IonText, IonList, IonSelect, IonSelectOption]
})
export class ListaProdutosPage {
  /* Lista completa vinda da API. */
  public produtos: Produto[] = [];

  /* Lista exibida depois da aplicação dos filtros. */
  public produtosFiltrados: Produto[] = [];

  /* Lista de categorias para permitir filtro por tipo de produto. */
  public categoriasDisponiveis: string[] = [];

  /* Controles de tela e filtros. */
  public listaVisivel: boolean = false;
  public carregando: boolean = false;
  public mensagemErro: string = '';
  public textoBusca: string = '';
  public categoriaSelecionada: string = 'todas';

  /* Injeção do serviço de produtos. */
  public constructor(private produtosService: ProdutosService) {}

  /* Botão 1 exigido no PDF: apresenta todos os produtos da lista. */
  public async apresentarTodosProdutos(): Promise<void> {
    try {
      this.carregando = true;
      this.mensagemErro = '';
      this.produtos = await this.produtosService.carregarProdutos();
      this.categoriasDisponiveis = this.produtosService.obterCategorias(this.produtos);
      this.aplicarFiltros();
      this.listaVisivel = true;
    } catch (erro: unknown) {
      this.mensagemErro = 'Não foi possível carregar a lista de produtos. Verifique a internet e tente novamente.';
      console.error('Erro ao carregar lista de produtos:', erro);
    } finally {
      this.carregando = false;
    }
  }

  /* Botão 2 exigido no PDF: suprime a lista da tela. */
  public suprimirLista(): void {
    this.listaVisivel = false;
    this.textoBusca = '';
    this.categoriaSelecionada = 'todas';
    this.produtosFiltrados = [];
  }

  /* Aplica filtro por texto e por categoria. */
  public aplicarFiltros(): void {
    this.produtosFiltrados = this.produtosService.filtrarProdutos(this.produtos, this.textoBusca, this.categoriaSelecionada);
  }

  /* Limpa os filtros e mostra novamente todos os produtos carregados. */
  public limparFiltros(): void {
    this.textoBusca = '';
    this.categoriaSelecionada = 'todas';
    this.aplicarFiltros();
  }
}
