package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Usuario;
import com.eliab.controleestudos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImplementacao implements UsuarioService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario registrar(Usuario usuario) {
        if (usuario.getNome() == null || usuario.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do usuário é obrigatório!");
        }
        return usuarioRepository.save(usuario);
    }
}
