package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.model.StatusEnum;
import com.eliab.controleestudos.model.Usuario;
import com.eliab.controleestudos.repository.SessaoRepository;
import com.eliab.controleestudos.repository.UsuarioRepository;
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

    @Override
    public Sessao iniciar(Sessao sessao) {
        Usuario usuario = usuarioRepository.findById(sessao.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
        sessao.setDataInicio(LocalDateTime.now());
        sessao.setStatus(StatusEnum.EM_ANDAMENTO);
        return sessaoRepository.save(sessao);
    }

    @Override
    public Sessao pausar(Long id) {
       Sessao sessao = sessaoRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Sessão não encontrada!"));
       if(sessao.getDataFim() == null && sessao.getStatus() == StatusEnum.EM_ANDAMENTO) {
           sessao.setStatus(StatusEnum.PAUSADA);
       }
        return sessaoRepository.save(sessao);
    }

    @Override
    public Sessao retomar(Long id) {
        Sessao sessao = sessaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada!"));
        if(sessao.getStatus() == StatusEnum.PAUSADA && sessao.getDataFim() == null) {
            sessao.setStatus(StatusEnum.EM_ANDAMENTO);
        }
        return sessaoRepository.save(sessao);
    }
    @Override
    public Sessao finalizar(Long id) {
    Sessao sessao = sessaoRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("Sessão não encontrada!"));

        if(sessao.getDataFim() != null) {
            throw new RuntimeException("A sessão já foi finalizada anteriormente.");
        }
            sessao.setDataFim(LocalDateTime.now());
            sessao.setStatus(StatusEnum.CONCLUIDA);
        return sessaoRepository.save(sessao);
    }

    @Override
    public Long calcularTempo(Sessao sessao) {
        if(sessao.getDataInicio() == null || sessao.getDataFim() == null){
            throw new RuntimeException("Datas de início ou fim não podem ser nulas.");
        }
        return ChronoUnit.MINUTES.between(sessao.getDataInicio(),sessao.getDataFim());
    }

    @Override
    public List<Sessao> listarSessoes() {
        return sessaoRepository.findAll();
    }

}
