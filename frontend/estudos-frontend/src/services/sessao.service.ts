import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
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

  private tempoRestante = 0;
  private pausado = false;
  private intervalo: any;

  constructor(
    private http: HttpClient,
    private historicoService: HistoricoService
  ) {}

  /** Inicia uma nova sessão e começa a contagem regressiva */
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

  /** Alterna entre pausado e retomado */
  pausarRetomar() {
    this.pausado = !this.pausado;
  }

  /** Encerra a sessão atual, persiste os dados e atualiza histórico */
encerrarSessao() {
  clearInterval(this.intervalo);

  const sessao = this.sessaoAtivaSubject.getValue();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  if (!sessao || !usuario.id) return;

  const itemSessao = {
    disciplina: sessao.disciplina,
    assunto: sessao.assunto,
    duracaoDaSessao: sessao.duracao,
    usuarioId: usuario.id,
    encerradaEm: new Date()
  };

  // Salva a sessão em /sessoes
  this.http.post(`${this.apiUrl}/sessoes`, itemSessao)
    .subscribe(() => {
      console.log('Sessão salva em /sessoes');

      // Atualiza o histórico do usuário no db.json
      this.historicoService.adicionarHistorico({
        disciplina: sessao.disciplina,
        assunto: sessao.assunto,
        duracaoRealizada: sessao.duracao * 60000,
        encerradaEm: new Date()
      }, usuario.id);
    });

  // Reseta a sessão ativa
  this.sessaoAtivaSubject.next(null);
  this.tempoRestante = 0;
  this.pausado = false;
}

  /** Atualiza o histórico do usuário no backend */
  private atualizarHistorico(itemSessao: any, usuarioId: number) {
    this.http.get<any[]>(`${this.apiUrl}/historicos?usuarioId=${usuarioId}`)
      .subscribe(histList => {
        if (histList.length) {
          const hist = histList[0];
          const novasSessoes = [...(hist.Sessoes || []), itemSessao];
          const totalHoras = novasSessoes.reduce((acc, s) => acc + s.duracaoDaSessao, 0);

          this.http.patch(`${this.apiUrl}/historicos/${hist.id}`, {
            Sessoes: novasSessoes,
            totalDeHorasEstudadas: totalHoras
          }).subscribe();
        } else {
          this.http.post(`${this.apiUrl}/historicos`, {
            Sessoes: [itemSessao],
            totalDeHorasEstudadas: itemSessao.duracaoDaSessao,
            usuarioId
          }).subscribe();
        }
      });
  }

  /** Retorna tempo restante da sessão em ms */
  getTempoRestante() {
    return this.tempoRestante;
  }

  /** Retorna se está pausado */
  isPausado() {
    return this.pausado;
  }

  /** Retorna progresso da sessão em % */
  getProgresso(): number {
    const sessao = this.sessaoAtivaSubject.getValue();
    if (!sessao) return 0;
    return (this.tempoRestante / (sessao.duracao * 60 * 1000)) * 100;
  }

  /** Permite restaurar sessões persistidas no dashboard */
  carregarSessaoAtiva(sessao: Sessao | null) {
    this.sessaoAtivaSubject.next(sessao);
  }
}
