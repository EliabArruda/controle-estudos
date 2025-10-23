import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


// historico.service.ts ou historico.component.ts
export interface HistoricoItem {
  disciplina: string;
  assunto: string;
  duracaoRealizada: number;
  encerradaEm: string; // já existente
  duracaoFormatada?: string; // <--- adiciona aqui
}


@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent {
  @Input() historico: HistoricoItem[] = [];
}
