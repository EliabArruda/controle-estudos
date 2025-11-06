package com.eliab.controleestudos.mapper;

import com.eliab.controleestudos.dto.UsuarioRequestDTO;
import com.eliab.controleestudos.dto.UsuarioResponseDTO;
import com.eliab.controleestudos.model.Usuario;

public class UsuarioMapper {

    public static UsuarioResponseDTO toDTO(Usuario usuario){
        if (usuario == null)
            return null;

        UsuarioResponseDTO dto = new UsuarioResponseDTO();

        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());

        return dto;
    }

    public static Usuario toEntity(UsuarioRequestDTO dto){
        if(dto == null)
            return null;

        Usuario usuario = new Usuario();

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());


        return usuario;
    }
}
