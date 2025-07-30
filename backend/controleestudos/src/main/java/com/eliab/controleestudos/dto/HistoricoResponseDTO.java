package com.eliab.controleestudos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoResponseDTO {

    private Long id;
    private UsuarioResponseDTO usuario;
    private List<SessaoResponseDTO> sessoes;
    private String totalHoras;

  }
