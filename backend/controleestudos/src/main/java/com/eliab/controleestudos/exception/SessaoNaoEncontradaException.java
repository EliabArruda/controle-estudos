package com.eliab.controleestudos.exception;

import jakarta.persistence.EntityNotFoundException;

public class SessaoNaoEncontradaException extends EntityNotFoundException {
    public SessaoNaoEncontradaException(String mensagem){
        super(mensagem);
    }
}
