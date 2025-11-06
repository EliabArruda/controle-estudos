package com.eliab.controleestudos.dto;

import com.eliab.controleestudos.model.Usuario;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessaoRequestDTO {

    private Long usuarioId;
    private String disciplina;
    private String assunto;
    @Min(value = 25, message = "A duração mínima é de 25 minutos!")
    @Max(value = 120, message = "A duração máxima é de 2 horas!")
    private Integer duracaoMinutos;
}
