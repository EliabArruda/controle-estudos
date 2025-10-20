import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SessaoDialogComponent } from '../sessao-dialog/sessao-dialog.component';
import { HistoricoComponent } from '../historico/historico.component'; // IMPORTAR

interface Sessao {
  disciplina: string;
  assunto: string;
  duracao: number; // minutos
}

interface HistoricoItem {
  disciplina: string;
  assunto: string;
  duracaoRealizada: number;
  encerradaEm: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HistoricoComponent // ADICIONADO
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sessaoAtiva: Sessao | null = null;
  tempoRestante = 0;
  progresso = 0;
  intervalo: any;
  pausado = false;

  historicoLocal: HistoricoItem[] = [];

  constructor(private dialog: MatDialog) {}

  abrirDialog() {
    const dialogRef = this.dialog.open(SessaoDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const novaSessao: Sessao = { ...result };
        this.iniciarSessao(novaSessao);
      }
    });
  }

  iniciarSessao(sessao: Sessao) {
    this.sessaoAtiva = sessao;
    this.tempoRestante = sessao.duracao * 60 * 1000;
    const total = this.tempoRestante;
    this.progresso = 100;
    this.pausado = false;

    this.intervalo = setInterval(() => {
      if (!this.pausado) {
        this.tempoRestante -= 1000;
        this.progresso = (this.tempoRestante / total) * 100;

        if (this.tempoRestante <= 0) {
          this.encerrarSessao();
        }
      }
    }, 1000);
  }

  pausarRetomar() {
    this.pausado = !this.pausado;
  }

  encerrarSessao() {
    clearInterval(this.intervalo);

    if (this.sessaoAtiva) {
      this.historicoLocal.push({
        disciplina: this.sessaoAtiva.disciplina,
        assunto: this.sessaoAtiva.assunto,
        duracaoRealizada: (this.sessaoAtiva.duracao * 60 * 1000) - this.tempoRestante,
        encerradaEm: new Date()
      });
    }

    this.sessaoAtiva = null;
    this.tempoRestante = 0;
    this.progresso = 0;
    this.pausado = false;
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

  calcularProgressoCirc(): number {
    return 440 - (440 * this.progresso) / 100;
  }
}
