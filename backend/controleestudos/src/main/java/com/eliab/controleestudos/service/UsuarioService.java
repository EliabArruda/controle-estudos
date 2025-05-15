package com.eliab.controleestudos.service;

import com.eliab.controleestudos.model.Usuario;
import com.eliab.controleestudos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public interface UsuarioService {

    Usuario registrar(Usuario usuario);
}
