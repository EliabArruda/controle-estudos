package com.eliab.controleestudos.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
        @ExceptionHandler(UsuarioNaoEncontradoException.class)
        public ResponseEntity<ErroResponse> handleUsuarioNaoEncontrado(UsuarioNaoEncontradoException ex) {
            return ResponseEntity
                    .status( HttpStatus.NOT_FOUND)
                    .body(new ErroResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value()));
        }
        @ExceptionHandler(SessaoNaoEncontradaException.class)
        public ResponseEntity<ErroResponse> handleSessaoNaoEncontrada(SessaoNaoEncontradaException ex) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ErroResponse(ex.getMessage(),  HttpStatus.NOT_FOUND.value()));
        }

        @ExceptionHandler(HistoricoNaoEncontradoException.class)
        public ResponseEntity<ErroResponse> handleHistoricoNaoEncontrado(HistoricoNaoEncontradoException ex){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ErroResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value()));
        }
    }