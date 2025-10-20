import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface Sessao {
  disciplina: string;
  assunto: string;
  duracao: number;
}

@Component({
  selector: 'app-sessao',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.scss']
})
export class SessaoComponent {
  @Input() sessao!: Sessao;
  @Input() tempoRestante!: number;
  @Input() progresso!: number;
  @Input() pausado!: boolean;

  @Output() encerrar = new EventEmitter<void>();
  @Output() pausarRetomar = new EventEmitter<void>();

  calcularProgressoCirc(): number {
    return 440 - (440 * this.progresso) / 100;
  }

  formatarTempo(ms: number): string {
    const totalSegundos = Math.floor(ms / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
