import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { SessaoComponent } from './sessao/sessao.component';
import { HistoricoComponent } from './historico/historico.component';

export const routes: Routes = [
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'sessoes', component: SessaoComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
];
