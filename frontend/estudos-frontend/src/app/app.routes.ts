import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'usuario',
    loadComponent: () =>
      import('./usuario/usuario.component').then(m => m.UsuarioComponent),
  },
  {
    path: 'sessao',
    loadComponent: () =>
      import('./sessao/sessao.component').then(m => m.SessaoComponent),
  },
  {
    path: 'historico',
    loadComponent: () =>
      import('./historico/historico.component').then(m => m.HistoricoComponent),
  },
  {
    path: '**',
    redirectTo: '', // redireciona rotas desconhecidas pro dashboard
  },
];
