import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioComponent } from './usuario/usuario.component';
import { SessaoComponent } from './sessao/sessao.component';
import { HistoricoComponent } from './historico/historico.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    DashboardComponent,
    UsuarioComponent,
    SessaoComponent,
    HistoricoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  usuarioLogado = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.verificarLogin();

    // Atualiza visibilidade conforme navegação
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.verificarLogin();
      }
    });
  }

  verificarLogin() {
    const user = localStorage.getItem('usuarioLogado');
    this.usuarioLogado = !!user;
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogado = false;
    this.router.navigate(['/login']);
  }

  irParaDashboard() {
    const user = localStorage.getItem('usuarioLogado');
    if (user) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
