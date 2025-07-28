package com.eliab.controleestudos.service;

import com.eliab.controleestudos.exception.HistoricoNaoEncontradoException;
import com.eliab.controleestudos.exception.UsuarioNaoEncontradoException;
import com.eliab.controleestudos.model.Historico;
import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.model.Usuario;
import com.eliab.controleestudos.repository.HistoricoRepository;
import com.eliab.controleestudos.repository.SessaoRepository;
import com.eliab.controleestudos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HistoricoServiceImplementacao implements HistoricoService{

    @Autowired
    private HistoricoRepository historicoRepository;
    @Autowired
    private SessaoRepository sessaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Historico salvar(Historico historico) {
        Usuario usuario = usuarioRepository.findById(historico.getUsuario().getId())
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não Encontrado!"));

        if(historico.getSessoes() == null || historico.getSessoes().isEmpty()){
            throw new IllegalStateException("Nenhuma sessão foi registrada no histórico!");
        }
        historico.setUsuario(usuario);
        return historicoRepository.save(historico);
    }

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

    @Override
    public List<Sessao> listarSessoesPorUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!"));

        Historico historico = historicoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new HistoricoNaoEncontradoException("Historico não encontrado!"));

        return historico.getSessoes();
    }

    @Override
    public void adicionarSessaoAoHistorico(Sessao sessao) {
       Historico historico = historicoRepository.findByUsuario(sessao.getUsuario())
               .orElseGet(() -> new Historico(sessao.getUsuario(), new ArrayList<>()));

        historico.getSessoes().add(sessao);
        historicoRepository.save(historico);
    }

}
