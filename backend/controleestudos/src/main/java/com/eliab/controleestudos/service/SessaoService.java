package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Sessao;
import org.springframework.stereotype.Service;

@Service
public interface SessaoService {

    Sessao iniciar(Sessao sessao);
    Sessao pausar(Sessao sessao);
    Sessao retomar(Sessao sessao);
    Sessao finalizar(Sessao sessao);
    Long calcularTempo(Sessao sessao);
}
