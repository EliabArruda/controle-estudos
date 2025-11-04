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
  private readonly apiUrl = 'http://localhost:3000/historico';
  private historicoSubject = new BehaviorSubject<HistoricoItem[]>([]);
  historico$ = this.historicoSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Carrega histórico persistido (ordem: mais recente primeiro) */
  carregarHistorico(usuarioId: number) {
    this.http.get<any[]>(`${this.apiUrl}?usuarioId=${usuarioId}`)
      .subscribe(resp => {
        if (resp && resp.length > 0) {
          const sessoes: HistoricoItem[] = resp[0].Sessoes.map((s: any) => ({
            disciplina: s.disciplina,
            assunto: s.assunto,
            duracaoRealizada: s.duracaoDaSessao * 60 * 1000,
            duracaoFormatada: this.formatarDuracao(s.duracaoDaSessao),
            encerradaEm: s.dataFim ? new Date(s.dataFim) : new Date()
          }))
          // Ordena da mais recente para a mais antiga
          .sort((a: HistoricoItem, b: HistoricoItem) =>
  new Date(b.encerradaEm).getTime() - new Date(a.encerradaEm).getTime()
);


          this.historicoSubject.next(sessoes);
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

        const duracaoEmMinutos = +(item.duracaoRealizada / 60000).toFixed(2);

        if (resp.length > 0) {
          const historico = resp[0];
          const novasSessoes = [
            ...historico.Sessoes,
            {
              disciplina: item.disciplina,
              assunto: item.assunto,
              duracaoDaSessao: duracaoEmMinutos,
              dataFim: encerramentoISO
            }
          ];

          const totalMinutos = novasSessoes.reduce(
            (acc: number, s: any) => acc + s.duracaoDaSessao, 0
          );

          this.http.patch(`${this.apiUrl}/${historico.id}`, {
            Sessoes: novasSessoes,
            totalDeHorasEstudadas: +totalMinutos.toFixed(2)
          }).subscribe(() => this.carregarHistorico(usuarioId));

        } else {
          const novoHistorico = {
            usuarioId,
            Sessoes: [{
              disciplina: item.disciplina,
              assunto: item.assunto,
              duracaoDaSessao: duracaoEmMinutos,
              dataFim: encerramentoISO
            }],
            totalDeHorasEstudadas: duracaoEmMinutos
          };

          this.http.post(this.apiUrl, novoHistorico)
            .subscribe(() => this.carregarHistorico(usuarioId));
        }
      });
  }

  /** Formata minutos decimais para HH:mm:ss */
  private formatarDuracao(minutos: number): string {
    const totalSegundos = Math.round(minutos * 60);
    const horas = Math.floor(totalSegundos / 3600);
    const minutosRestantes = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    const h = horas.toString().padStart(2, '0');
    const m = minutosRestantes.toString().padStart(2, '0');
    const s = segundos.toString().padStart(2, '0');

    return `${h}:${m}:${s}`;
  }
}
