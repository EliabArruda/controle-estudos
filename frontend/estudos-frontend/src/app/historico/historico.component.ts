import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface HistoricoItem {
  disciplina: string;
  assunto: string;
  duracaoRealizada: number; // em ms
  encerradaEm: Date;
}

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="historico-container">
      <mat-card *ngFor="let item of historico" class="historico-card">
        <mat-card-title>{{ item.disciplina }} - {{ item.assunto }}</mat-card-title>
        <mat-card-content>
          <p>Duração realizada: {{ item.duracaoRealizada / 60000 | number:'1.0-0' }} min</p>
          <p>Encerrada em: {{ item.encerradaEm | date:'short' }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent {
  @Input() historico: HistoricoItem[] = [];
}
