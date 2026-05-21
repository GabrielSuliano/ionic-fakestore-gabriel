import { Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, storefrontOutline } from 'ionicons/icons';

/* Página responsável por organizar a navegação em abas. */
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage {
  /* Registro dos ícones usados nos botões das abas. */
  public constructor() {
    addIcons({
      homeOutline: homeOutline,
      storefrontOutline: storefrontOutline,
      listOutline: listOutline
    });
  }
}
