import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { SessaoDialogComponent } from '../sessao-dialog/sessao-dialog.component';
import { SessaoService, Sessao } from '../../services/sessao.service';
import { HistoricoService, HistoricoItem } from '../../services/historico.service';
import { HistoricoComponent } from '../historico/historico.component';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, HistoricoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Dados de estatísticas
tempoTotalFormatado = '00:00';
totalSessoes = 0;
mediaDuracao = '00:00';
ultimaSessaoData = '-';

private atualizarEstatisticas() {
  if (!this.historicoLocal.length) {
    this.tempoTotalFormatado = '00:00';
    this.totalSessoes = 0;
    this.mediaDuracao = '00:00';
    this.ultimaSessaoData = '-';
    return;
  }

  const totalMs = this.historicoLocal.reduce((acc, h) => acc + h.duracaoRealizada, 0);
  const mediaMs = totalMs / this.historicoLocal.length;

  this.tempoTotalFormatado = this.formatarTempo(totalMs);
  this.totalSessoes = this.historicoLocal.length;
  this.mediaDuracao = this.formatarTempo(mediaMs);

  const ultima = this.historicoLocal
    .map(h => new Date(h.encerradaEm))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  this.ultimaSessaoData = ultima ? ultima.toLocaleDateString('pt-BR') : '-';
}


  sessaoAtiva: Sessao | null = null;
  tempoRestante = 0;
  tempoDecorrido = 0; // 👈 novo
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

    this.sessaoService.sessaoAtiva$.subscribe(sessao => {
      this.sessaoAtiva = sessao;
      if (this.intervalSub) this.intervalSub.unsubscribe();

      if (sessao) {
        const total = sessao.duracao * 60 * 1000;
        this.tempoRestante = this.sessaoService.getTempoRestante() || total;
        this.tempoDecorrido = total - this.tempoRestante; // 👈 calcula quanto já estudou
        this.progresso = (this.tempoRestante / total) * 100;
        this.pausado = this.sessaoService.isPausado();

        this.intervalSub = interval(1000).subscribe(() => {
          this.tempoRestante = this.sessaoService.getTempoRestante();
          this.tempoDecorrido = total - this.tempoRestante; // 👈 atualiza continuamente
          this.progresso = (this.tempoRestante / total) * 100;
          this.pausado = this.sessaoService.isPausado();
        });
      } else {
        this.tempoRestante = 0;
        this.tempoDecorrido = 0;
        this.progresso = 0;
        this.pausado = false;
      }
    });

    this.historicoService.historico$.subscribe(h => {
  this.historicoLocal = h.map(item => ({
    ...item,
    // mantém como Date para o date pipe funcionar corretamente
    encerradaEm: item.encerradaEm ? new Date(item.encerradaEm) : new Date(),
    duracaoFormatada: item.duracaoFormatada || this.formatarTempo(item.duracaoRealizada)
  }));
      this.atualizarEstatisticas();
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

  pad(num: number): string { return num < 10 ? '0' + num : num.toString(); }

  calcularProgressoCirc(): number {
    return 440 - (440 * this.progresso) / 100;
  }
}
