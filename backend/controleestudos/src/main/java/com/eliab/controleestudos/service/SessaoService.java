package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Sessao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SessaoService {

    Sessao iniciar(Sessao sessao);
    Sessao pausar(Long id);
    Sessao retomar(Long id);
    Sessao finalizar(Long id);
    Long calcularTempo(Sessao sessao);
}
