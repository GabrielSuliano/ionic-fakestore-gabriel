import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

/* Componente raiz da aplicação Ionic. */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  /* O componente raiz não precisa de lógica adicional neste trabalho. */
  public nomeAplicacao: string = 'FakeStore Gabriel';
}
