import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HistoricoService } from './historico.service';

export interface Sessao {
  disciplina: string;
  assunto: string;
  duracao: number;
}

@Injectable({ providedIn: 'root' })
export class SessaoService {
  private readonly apiUrl = 'http://localhost:3000';
  private sessaoAtivaSubject = new BehaviorSubject<Sessao | null>(null);
  sessaoAtiva$ = this.sessaoAtivaSubject.asObservable();

  private tempoRestante = 0;
  private pausado = false;
  private intervalo: any;

  constructor(
    private http: HttpClient,
    private historicoService: HistoricoService,
  ) {}

  
  iniciarSessao(sessao: Sessao) {
    this.sessaoAtivaSubject.next(sessao);
    this.tempoRestante = sessao.duracao * 60 * 1000;
    this.pausado = false;

    this.intervalo = setInterval(() => {
      if (!this.pausado) {
        this.tempoRestante -= 1000;
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

    const sessao = this.sessaoAtivaSubject.getValue();
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    if (!sessao || !usuario.id) return;

    const tempoTotalMs = sessao.duracao * 60 * 1000;
    const tempoEstudadoMs = tempoTotalMs - this.tempoRestante;

    const itemSessao = {
      disciplina: sessao.disciplina,
      assunto: sessao.assunto,
      duracaoDaSessao: tempoEstudadoMs,
      usuarioId: usuario.id,
      encerradaEm: new Date(),
    };


    this.http.post(`${this.apiUrl}/sessoes`, itemSessao).subscribe(() => {
      console.log('Sessão salva em /sessoes');


      this.historicoService.adicionarHistorico(
        {
          disciplina: sessao.disciplina,
          assunto: sessao.assunto,
          duracaoRealizada: tempoEstudadoMs,
          duracaoFormatada: this.formatarTempo(tempoEstudadoMs),
          encerradaEm: new Date(),
        },
        usuario.id,
      );
    });


    this.sessaoAtivaSubject.next(null);
    this.tempoRestante = 0;
    this.pausado = false;
  }

  
  private formatarTempo(msTotais: number): string {
    const totalSegundos = Math.floor(msTotais / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    if (horas > 0) return `${horas}h ${minutos}m ${segundos}s`;
    if (minutos > 0) return `${minutos}m ${segundos}s`;
    return `${segundos}s`;
  }

  
  getTempoRestante() {
    return this.tempoRestante;
  }

  isPausado() {
    return this.pausado;
  }

  getProgresso(): number {
    const sessao = this.sessaoAtivaSubject.getValue();
    if (!sessao) return 0;
    return (this.tempoRestante / (sessao.duracao * 60 * 1000)) * 100;
  }

  carregarSessaoAtiva(sessao: Sessao | null) {
    this.sessaoAtivaSubject.next(sessao);
  }
}
