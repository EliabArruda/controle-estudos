package com.eliab.controleestudos.exception;

import jakarta.persistence.EntityNotFoundException;

public class HistoricoNaoEncontradoException extends EntityNotFoundException {
    public HistoricoNaoEncontradoException(String mensagem){
        super(mensagem);
    }
}