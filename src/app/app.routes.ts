import { Routes } from '@angular/router';

import { TabsPage } from './pages/tabs/tabs.page';

/* Rotas principais da aplicação com estrutura de abas. */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/aba-inicial',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'aba-inicial',
        loadComponent: function () {
          return import('./pages/aba-inicial/aba-inicial.page').then(function (modulo) {
            return modulo.AbaInicialPage;
          });
        }
      },
      {
        path: 'produto-individual',
        loadComponent: function () {
          return import('./pages/produto-individual/produto-individual.page').then(function (modulo) {
            return modulo.ProdutoIndividualPage;
          });
        }
      },
      {
        path: 'lista-produtos',
        loadComponent: function () {
          return import('./pages/lista-produtos/lista-produtos.page').then(function (modulo) {
            return modulo.ListaProdutosPage;
          });
        }
      },
      {
        path: '',
        redirectTo: '/tabs/aba-inicial',
        pathMatch: 'full'
      }
    ]
  }
];
