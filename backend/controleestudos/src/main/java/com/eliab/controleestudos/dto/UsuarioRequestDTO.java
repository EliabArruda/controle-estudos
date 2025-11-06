package com.eliab.controleestudos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequestDTO {

    private String nome;
    private String email;
    private String senha;
}
