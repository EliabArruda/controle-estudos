package com.eliab.controleestudos.exception;

import lombok.Data;

@Data
public class ErroResponse {

    private String mensagem;

    private int status;

    private String timeStamp;


    public ErroResponse(String mensagem, int status){
        this.mensagem = mensagem;
        this.status = status;
        this.timeStamp = java.time.LocalDateTime.now().toString();
    }
}
