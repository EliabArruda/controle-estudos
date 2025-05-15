package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Sessao;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface HistoricoService {

    List<Sessao> filtrarPorData(Long id,LocalDateTime data);

    List<Sessao> filtrarPorDisciplina(Long id, String disciplina);
}
