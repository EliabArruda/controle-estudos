package com.eliab.controleestudos.controller;

import com.eliab.controleestudos.model.Usuario;
import com.eliab.controleestudos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping(value = "/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario){
        usuarioService.registrar(usuario);
        return ResponseEntity.ok(usuario);
    }

}
