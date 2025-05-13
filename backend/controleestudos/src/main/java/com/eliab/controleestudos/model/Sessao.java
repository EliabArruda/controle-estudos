package com.eliab.controleestudos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Sessao {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String disciplina;
    private String assunto;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private int duracaoMinutos;
    private StatusEnum status;

    //Construtor
    public Sessao(String disciplina, String assunto, int duracaoMinutos, StatusEnum status){
        this.disciplina = disciplina;
        this.assunto = assunto;
        this.duracaoMinutos = duracaoMinutos;
        this.status = status;
    }
    public Sessao(){
    }

    //Métodos

    public void iniciar(){
    }
    public void pausar(){
    }
    public void finalizar(){
    }
    public void calcularTempo(){
    }
}
