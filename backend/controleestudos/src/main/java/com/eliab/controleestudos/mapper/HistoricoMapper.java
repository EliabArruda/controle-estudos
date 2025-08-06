package com.eliab.controleestudos.mapper;

import com.eliab.controleestudos.dto.HistoricoRequestDTO;
import com.eliab.controleestudos.dto.HistoricoResponseDTO;
import com.eliab.controleestudos.dto.SessaoResponseDTO;
import com.eliab.controleestudos.dto.UsuarioRequestDTO;
import com.eliab.controleestudos.model.Historico;
import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.model.Usuario;
import org.apache.commons.lang3.time.DurationFormatUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class HistoricoMapper {

    public static HistoricoResponseDTO toDto(Historico historico){
        if(historico == null)
            return null;

        HistoricoResponseDTO dto = new HistoricoResponseDTO();
        List<SessaoResponseDTO> sessoes = historico.getSessoes() != null ?
          historico.getSessoes()
                  .stream()
                  .map(SessaoMapper::toDto)
                  .collect(Collectors.toList())
        : new ArrayList<>();

        dto.setId(historico.getId());
        dto.setSessoes(sessoes);
        dto.setTotalHoras(DurationFormatUtils.formatDuration(historico.getTotalHoras().toMillis(), "H'h' mm'min'"));

        return dto;
    }
    public static Historico toEntity(HistoricoRequestDTO dto) {
        if (dto == null)
            return null;

        Historico historico = new Historico();

        Usuario usuario = new Usuario();
        usuario.setId(dto.getUsuarioId());
        historico.setUsuario(usuario);

        // Mapeia a lista de SessaoRequestDTO para List<Sessao>
        List<Sessao> sessoes = dto.getSessoes() != null
                ? dto.getSessoes().stream()
                .map(SessaoMapper::toEntity)
                .collect(Collectors.toList())
                : new ArrayList<>();

        historico.setSessoes(sessoes);

        return historico;
    }

}
