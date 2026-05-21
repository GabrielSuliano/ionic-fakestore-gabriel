import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';

/* Tela inicial com o cartão de identificação do aluno. */
@Component({
  selector: 'app-aba-inicial',
  templateUrl: './aba-inicial.page.html',
  styleUrls: ['./aba-inicial.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAvatar, IonList, IonItem, IonLabel, IonChip]
})
export class AbaInicialPage {
  /* Dados do aluno: altere estes valores antes de apresentar ao professor. */
  public nomeCompleto: string = 'Gabriel Suliano';
  public turma: string = 'ADS0101M';
  public unidade: string = 'CG';
  public turno: string = 'Manha';
  public palavraChave: string = '';

  /* Caminho da foto guardada dentro da pasta src/assets. */
  public caminhoFoto: string = 'assets/foto-gabriel.jpeg';

  /* Tema escolhido para a aplicação. */
  public temaAplicacao: string = 'Vitrine FakeStore';
}
