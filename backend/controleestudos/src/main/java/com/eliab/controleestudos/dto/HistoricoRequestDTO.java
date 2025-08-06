package com.eliab.controleestudos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoRequestDTO {

    private Long usuarioId;
    private List<SessaoRequestDTO> sessoes;
}
