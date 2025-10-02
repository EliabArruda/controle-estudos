import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { UsuarioComponent } from './usuario/usuario.component';
import { SessaoComponent } from './sessao/sessao.component';
import { HistoricoComponent } from './historico/historico.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MaterialModule,
    UsuarioComponent,
    SessaoComponent,
    HistoricoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrigido de styleUrl
})
export class AppComponent {
  title = 'estudos-frontend';
}
