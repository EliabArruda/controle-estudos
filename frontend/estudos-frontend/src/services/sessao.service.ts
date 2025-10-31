import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HistoricoService } from './historico.service';

export interface Sessao {
  disciplina: string;
  assunto: string;
  duracao: number; // em minutos
}

@Injectable({ providedIn: 'root' })
export class SessaoService {
  private readonly apiUrl = 'http://localhost:3000';
  private sessaoAtivaSubject = new BehaviorSubject<Sessao | null>(null);
  sessaoAtiva$ = this.sessaoAtivaSubject.asObservable();

  private tempoRestante = 0; // em ms
  private pausado = false;
  private intervalo: any;

  constructor(
    private http: HttpClient,
    private historicoService: HistoricoService
  ) {}

  /** Inicia uma nova sessão */
  iniciarSessao(sessao: Sessao) {
    this.sessaoAtivaSubject.next(sessao);
    this.tempoRestante = sessao.duracao * 60 * 1000; // em ms
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

  /** Pausa ou retoma */
  pausarRetomar() {
    this.pausado = !this.pausado;
  }

  /** Encerra e grava histórico corretamente */
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
      duracaoDaSessao: tempoEstudadoMs, // salva o tempo realmente estudado
      usuarioId: usuario.id,
      encerradaEm: new Date()
    };

    // salva a sessão em /sessoes
    this.http.post(`${this.apiUrl}/sessoes`, itemSessao).subscribe(() => {
      console.log('Sessão salva em /sessoes');

      // adiciona ao histórico com o tempo correto e formatado
      this.historicoService.adicionarHistorico({
        disciplina: sessao.disciplina,
        assunto: sessao.assunto,
        duracaoRealizada: tempoEstudadoMs,
        duracaoFormatada: this.formatarTempo(tempoEstudadoMs),
        encerradaEm: new Date()
      }, usuario.id);
    });

    // limpa estado
    this.sessaoAtivaSubject.next(null);
    this.tempoRestante = 0;
    this.pausado = false;
  }

  /** Formata tempo de ms -> "Xm Ys" */
  private formatarTempo(msTotais: number): string {
  const totalSegundos = Math.floor(msTotais / 1000);
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  if (horas > 0) return `${horas}h ${minutos}m ${segundos}s`;
  if (minutos > 0) return `${minutos}m ${segundos}s`;
  return `${segundos}s`;
}


  /** Getters */
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
