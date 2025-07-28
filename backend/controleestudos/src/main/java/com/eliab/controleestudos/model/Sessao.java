package com.eliab.controleestudos.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dataInicio;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dataFim;

    @Min(value = 25, message = "A duração mínima é de 25 minutos!")
    @Max(value = 120, message = "A duração mínima é de 2 horas!")
    private Integer duracaoMinutos;
    private StatusEnum status;
}

