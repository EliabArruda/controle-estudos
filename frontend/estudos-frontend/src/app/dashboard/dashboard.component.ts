import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { SessaoDialogComponent } from '../sessao-dialog/sessao-dialog.component';
import { SessaoService, Sessao } from '../../services/sessao.service';
import { HistoricoService, HistoricoItem as HistoricoItemService } from '../../services/historico.service';
import { HistoricoComponent } from '../historico/historico.component';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';

interface HistoricoItem {
  disciplina: string;
  assunto: string;
  duracaoRealizada: number;
  encerradaEm: string; // string para o HistoricoComponent
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, HistoricoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sessaoAtiva: Sessao | null = null;
  tempoRestante = 0;
  progresso = 0;
  pausado = false;
  historicoLocal: HistoricoItem[] = [];
  private intervalSub?: Subscription;

  constructor(
    private dialog: MatDialog,
    private sessaoService: SessaoService,
    private historicoService: HistoricoService
  ) {}

  ngOnInit() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  if (usuario.id) {
    this.historicoService.carregarHistorico(usuario.id);
  }

  // Atualiza sessão ativa e temporizador
  this.sessaoService.sessaoAtiva$.subscribe(sessao => {
    this.sessaoAtiva = sessao;
    if (this.intervalSub) this.intervalSub.unsubscribe();

    if (sessao) {
      const total = sessao.duracao * 60 * 1000;
      this.tempoRestante = this.sessaoService.getTempoRestante() || total;
      this.progresso = (this.tempoRestante / total) * 100;
      this.pausado = this.sessaoService.isPausado();

      this.intervalSub = interval(1000).subscribe(() => {
        this.tempoRestante = this.sessaoService.getTempoRestante();
        this.progresso = (this.tempoRestante / total) * 100;
        this.pausado = this.sessaoService.isPausado();
      });
    } else {
      this.tempoRestante = 0;
      this.progresso = 0;
      this.pausado = false;
    }
  });

  // Atualiza histórico no dashboard
this.historicoService.historico$.subscribe(h => {
  this.historicoLocal = h.map(item => ({
    ...item,
    encerradaEm: new Date(item.encerradaEm).toLocaleString(),
    duracaoFormatada: `${Math.round(item.duracaoRealizada / 60000)} min`
  }));
});
}

  ngOnDestroy() {
    if (this.intervalSub) this.intervalSub.unsubscribe();
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(SessaoDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.sessaoService.iniciarSessao(result);
    });
  }

  pausarRetomar() { this.sessaoService.pausarRetomar(); }
  encerrarSessao() { this.sessaoService.encerrarSessao(); }

  formatarTempo(ms: number): string {
    const totalSegundos = Math.floor(ms / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${this.pad(minutos)}:${this.pad(segundos)}`;
  }
  formatarDuracao(ms: number): string {
  const minutos = Math.round(ms / 60000);
  return `${minutos} min`;
}



  pad(num: number): string { return num < 10 ? '0' + num : num.toString(); }
  calcularProgressoCirc(): number { return 440 - (440 * this.progresso) / 100; }
}
