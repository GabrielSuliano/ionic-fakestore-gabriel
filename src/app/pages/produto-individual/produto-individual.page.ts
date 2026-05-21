import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Produto } from '../../models/produto';
import { ProdutosService } from '../../services/produtos.service';

/* Tela que apresenta os produtos um por um. */
@Component({
  selector: 'app-produto-individual',
  templateUrl: './produto-individual.page.html',
  styleUrls: ['./produto-individual.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonButtons, IonItem, IonLabel, IonBadge, IonSpinner, IonText]
})
export class ProdutoIndividualPage implements OnInit {
  /* Lista de produtos carregada por meio do serviço. */
  public produtos: Produto[] = [];

  /* Produto exibido no momento. */
  public produtoAtual: Produto | null = null;

  /* Posição atual dentro do array de produtos. */
  public indiceAtual: number = 0;

  /* Controle visual de carregamento e erro. */
  public carregando: boolean = true;
  public mensagemErro: string = '';

  /* Injeção do serviço responsável pela API. */
  public constructor(private produtosService: ProdutosService) {}

  /* Carrega os produtos quando a tela é aberta. */
  public async ngOnInit(): Promise<void> {
    await this.carregarProdutos();
  }

  /* Indica se o botão anterior deve estar habilitado. */
  public get podeVoltar(): boolean {
    return this.indiceAtual > 0;
  }

  /* Indica se o botão próximo deve estar habilitado. */
  public get podeAvancar(): boolean {
    return this.indiceAtual < this.produtos.length - 1;
  }

  /* Apresenta o produto anterior, caso exista. */
  public apresentarProdutoAnterior(): void {
    if (this.podeVoltar) {
      this.indiceAtual = this.indiceAtual - 1;
      this.atualizarProdutoAtual();
    }
  }

  /* Apresenta o próximo produto, caso exista. */
  public apresentarProximoProduto(): void {
    if (this.podeAvancar) {
      this.indiceAtual = this.indiceAtual + 1;
      this.atualizarProdutoAtual();
    }
  }

  /* Carrega a lista de produtos usando o serviço. */
  private async carregarProdutos(): Promise<void> {
    try {
      this.carregando = true;
      this.mensagemErro = '';
      this.produtos = await this.produtosService.carregarProdutos();
      this.indiceAtual = 0;
      this.atualizarProdutoAtual();
    } catch (erro: unknown) {
      this.mensagemErro = 'Não foi possível carregar os produtos. Verifique a internet e tente novamente.';
      console.error('Erro ao carregar produtos:', erro);
    } finally {
      this.carregando = false;
    }
  }

  /* Atualiza a referência do produto que aparece na tela. */
  private atualizarProdutoAtual(): void {
    if (this.produtos.length === 0) {
      this.produtoAtual = null;
      return;
    }

    this.produtoAtual = this.produtos[this.indiceAtual];
  }
}
