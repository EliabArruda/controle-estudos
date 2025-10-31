import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // <-- IMPORTA ISSO!

export interface HistoricoItem {
  disciplina: string;
  assunto: string;
  duracaoRealizada: number;
  encerradaEm: string;
  duracaoFormatada?: string; // <-- aqui continua
}

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule], // <-- ADICIONA AQUI
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent {
  @Input() historico: HistoricoItem[] = [];
}
