package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Historico;
import com.eliab.controleestudos.model.Sessao;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface HistoricoService {

    Historico salvar(Historico historico);
    List<Sessao> filtrarPorData(Long id,LocalDateTime data);
    List<Sessao> filtrarPorDisciplina(Long id, String disciplina);

    List<Sessao> listarSessoesPorUsuario(Long usuarioId);
    void adicionarSessaoAoHistorico(Sessao sessao);
}
