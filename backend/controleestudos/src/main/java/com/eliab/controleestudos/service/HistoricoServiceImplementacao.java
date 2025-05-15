package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Historico;
import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.repository.HistoricoRepository;
import com.eliab.controleestudos.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoricoServiceImplementacao implements HistoricoService{

    @Autowired
    private HistoricoRepository historicoRepository;
    @Autowired
    private SessaoRepository sessaoRepository;
    @Override
    public List<Sessao> filtrarPorData(Long id, LocalDateTime data) {
        Historico historico = historicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico não encontrado"));

       return historico.getSessoes().stream().filter(sessao -> sessao.getDataInicio() != null &&
                sessao.getDataInicio().toLocalDate().isEqual(data.toLocalDate())).collect(Collectors.toList());
    }

    @Override
    public List<Sessao> filtrarPorDisciplina(Long id, String disciplina) {
        Historico historico = historicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico não encontrado!"));

        return historico.getSessoes().stream().filter(sessao -> sessao.getDisciplina() != null &&
                sessao.getDisciplina().equalsIgnoreCase(disciplina)).collect(Collectors.toList());
    }
}
