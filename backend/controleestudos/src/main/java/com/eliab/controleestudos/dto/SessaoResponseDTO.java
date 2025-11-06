package com.eliab.controleestudos.dto;

import com.eliab.controleestudos.model.StatusEnum;
import com.eliab.controleestudos.model.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessaoResponseDTO {


    private Long id;
    private UsuarioResponseDTO usuario;
    private String disciplina;
    private String assunto;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dataInicio;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dataFim;
    private Integer duracaoMinutos;
    private StatusEnum status;
}
