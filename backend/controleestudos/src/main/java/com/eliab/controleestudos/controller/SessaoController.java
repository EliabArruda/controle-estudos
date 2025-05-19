package com.eliab.controleestudos.controller;

import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.service.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessao")
public class SessaoController {

    @Autowired
    private SessaoService sessaoService;

    @PostMapping(value = "/iniciar")
    public ResponseEntity <?> iniciar(@RequestBody Sessao sessao){
        sessaoService.iniciar(sessao);
        return ResponseEntity.ok(sessao);
    }

    @PutMapping(value = "/pausar/{id}")
    public ResponseEntity<?> pausar(@PathVariable Long id){
        sessaoService.pausar(id);
        return ResponseEntity.ok(id);
    }
    @PutMapping(value = "/retomar/{id}")
    public ResponseEntity<?> retomar(@PathVariable Long id){
        sessaoService.retomar(id);
        return ResponseEntity.ok(id);
    }
    @PutMapping(value = "/finalizar/{id}")
    public ResponseEntity<?> finalizar(@PathVariable Long id){
        sessaoService.finalizar(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping(value = "/lista-todos")
    public ResponseEntity<Iterable<Sessao>> listar(){
        return ResponseEntity.ok(sessaoService.listarSessoes());
    }
}
