package com.eliab.controleestudos.mapper;

import com.eliab.controleestudos.dto.SessaoRequestDTO;
import com.eliab.controleestudos.dto.SessaoResponseDTO;
import com.eliab.controleestudos.dto.UsuarioResponseDTO;
import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.model.Usuario;

public class SessaoMapper {

    public static SessaoResponseDTO toDto(Sessao sessao){
        if(sessao == null)
            return null;

        SessaoResponseDTO dto = new SessaoResponseDTO();
        UsuarioResponseDTO usuarioDto = new UsuarioResponseDTO();
        usuarioDto.setId(sessao.getUsuario().getId());


        dto.setId(sessao.getId());
        dto.setDisciplina(sessao.getDisciplina());
        dto.setAssunto(sessao.getAssunto());
        dto.setUsuario(usuarioDto);
        dto.setDataInicio(sessao.getDataInicio());
        dto.setDataFim(sessao.getDataFim());
        dto.setDuracaoMinutos(sessao.getDuracaoMinutos());
        dto.setStatus(sessao.getStatus());

        return dto;
    }

    public static Sessao toEntity(SessaoRequestDTO dto){
        if(dto == null)
            return null;

        Sessao sessao = new Sessao();

        Usuario usuario = new Usuario();
        usuario.setId(dto.getUsuarioId());

        sessao.setUsuario(usuario);
        sessao.setDisciplina(dto.getDisciplina());
        sessao.setAssunto(dto.getAssunto());
        sessao.setDuracaoMinutos(dto.getDuracaoMinutos());

        return sessao;
    }
}
