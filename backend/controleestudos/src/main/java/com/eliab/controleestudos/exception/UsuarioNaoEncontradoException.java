package com.eliab.controleestudos.exception;

import jakarta.persistence.EntityNotFoundException;

public class UsuarioNaoEncontradoException extends EntityNotFoundException {
    public UsuarioNaoEncontradoException(String mensagem){
        super(mensagem);
    }
}