import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

/* Inicialização principal da aplicação Angular standalone. */
bootstrapApplication(AppComponent, {
  providers: [
    /* Estratégia de rotas recomendada pelo Ionic para manter a navegação fluida. */
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    /* Configuração principal dos componentes Ionic. */
    provideIonicAngular(),

    /* Configuração das rotas com pré-carregamento das páginas. */
    provideRouter(routes, withPreloading(PreloadAllModules)),

    /* Configuração necessária para consumir APIs com HttpClient. */
    provideHttpClient()
  ]
}).catch(function (erro: unknown): void {
  /* Tratamento simples para exibir erros de inicialização no console. */
  console.error('Erro ao iniciar a aplicação:', erro);
});
