package com.eliab.controleestudos.service;

import com.eliab.controleestudos.exception.SessaoNaoEncontradaException;
import com.eliab.controleestudos.exception.UsuarioNaoEncontradoException;
import com.eliab.controleestudos.model.Historico;
import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.model.StatusEnum;
import com.eliab.controleestudos.model.Usuario;
import com.eliab.controleestudos.repository.SessaoRepository;
import com.eliab.controleestudos.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class SessaoServiceImplementacao implements SessaoService{

    @Autowired
    private SessaoRepository sessaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private HistoricoService historicoService;

    @Override
    public Sessao iniciar(Sessao sessao) {
        Usuario usuario = usuarioRepository.findById(sessao.getUsuario().getId())
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!"));
        sessao.setUsuario(usuario);
        sessao.setDataInicio(LocalDateTime.now());
        sessao.setStatus(StatusEnum.EM_ANDAMENTO);
        return sessaoRepository.save(sessao);
    }


    @Transactional
    @Override
    public Sessao pausar(Long id) {
       Sessao sessao = sessaoRepository.findById(id)
               .orElseThrow(() -> new SessaoNaoEncontradaException("Sessão não encontrada!"));
       if(sessao.getDataFim() == null && sessao.getStatus() == StatusEnum.EM_ANDAMENTO) {
           sessao.setStatus(StatusEnum.PAUSADA);
       }
        return sessaoRepository.save(sessao);
    }

    @Override
    public Sessao retomar(Long id) {
        Sessao sessao = sessaoRepository.findById(id)
                .orElseThrow(() -> new SessaoNaoEncontradaException("Sessão não encontrada!"));
        if(sessao.getStatus() == StatusEnum.PAUSADA && sessao.getDataFim() == null) {
            sessao.setStatus(StatusEnum.EM_ANDAMENTO);
        }
        return sessaoRepository.save(sessao);
    }
    @Override
    public Sessao finalizar(Long id) {
        Sessao sessao = sessaoRepository.findById(id)
                .orElseThrow(() -> new SessaoNaoEncontradaException("Sessão não encontrada!"));

        if (sessao.getDataFim() != null) {
            throw new IllegalStateException("A sessão já foi finalizada anteriormente.");
        }
        sessao.setDataFim(LocalDateTime.now());
        sessao.setStatus(StatusEnum.CONCLUIDA);
        Sessao sessaoFinalizada = sessaoRepository.save(sessao);

        historicoService.adicionarSessaoAoHistorico(sessaoFinalizada);

        return sessaoFinalizada;
    }


    @Override
    public Long calcularTempo(Sessao sessao) {
        if(sessao.getDataInicio() == null || sessao.getDataFim() == null){
            throw new RuntimeException("Datas de início ou fim não podem ser nulas.");
        }
        return ChronoUnit.MINUTES.between(sessao.getDataInicio(),sessao.getDataFim());
    }
}
