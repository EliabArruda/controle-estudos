package com.eliab.controleestudos.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Sessao {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private String disciplina;
    private String assunto;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private int duracaoMinutos;
    private StatusEnum status;
}

