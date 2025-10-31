import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface HistoricoItem {
  disciplina: string;
  assunto: string;
  duracaoRealizada: number;
  duracaoFormatada: string;
  encerradaEm: string | Date;
}

@Injectable({ providedIn: 'root' })
export class HistoricoService {
  private readonly apiUrl = 'http://localhost:3000/historico'; // sem 's'
  private historicoSubject = new BehaviorSubject<HistoricoItem[]>([]);
  historico$ = this.historicoSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Carrega histórico persistido */
  carregarHistorico(usuarioId: number) {
    this.http.get<any[]>(`${this.apiUrl}?usuarioId=${usuarioId}`)
      .subscribe(resp => {
        if (resp && resp.length > 0) {
          const sessoes: HistoricoItem[] = resp[0].Sessoes.map((s: any) => ({
            disciplina: s.disciplina,
            assunto: s.assunto,
            duracaoRealizada: s.duracaoDaSessao * 60 * 1000,
            encerradaEm: s.dataFim ? new Date(s.dataFim) : new Date()
          }));
          this.historicoSubject.next(sessoes); // atualiza BehaviorSubject com histórico persistido
        } else {
          this.historicoSubject.next([]);
        }
      });
  }
  

  /** Adiciona novo item ao histórico */
adicionarHistorico(item: HistoricoItem, usuarioId: number) {
  this.http.get<any[]>(`${this.apiUrl}?usuarioId=${usuarioId}`)
    .subscribe(resp => {
      const encerramentoISO = item.encerradaEm
        ? new Date(item.encerradaEm).toISOString()
        : new Date().toISOString();

      if (resp.length > 0) {
        const historico = resp[0];
        const novasSessoes = [
          ...historico.Sessoes,
          {
            disciplina: item.disciplina,
            assunto: item.assunto,
            duracaoDaSessao: Math.round(item.duracaoRealizada / 60000),
            dataFim: encerramentoISO
          }
        ];

        const totalMinutos = novasSessoes.reduce(
          (acc: number, s: any) => acc + s.duracaoDaSessao, 0
        );

        this.http.patch(`${this.apiUrl}/${historico.id}`, {
          Sessoes: novasSessoes,
          totalDeHorasEstudadas: totalMinutos
        }).subscribe(() => this.carregarHistorico(usuarioId));

      } else {
        const novoHistorico = {
          usuarioId,
          Sessoes: [{
            disciplina: item.disciplina,
            assunto: item.assunto,
            duracaoDaSessao: Math.round(item.duracaoRealizada / 60000),
            dataFim: encerramentoISO
          }],
          totalDeHorasEstudadas: Math.round(item.duracaoRealizada / 60000)
        };

        this.http.post(this.apiUrl, novoHistorico)
          .subscribe(() => this.carregarHistorico(usuarioId));
      }
    });
}
}
