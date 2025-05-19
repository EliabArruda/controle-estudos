package com.eliab.controleestudos.controller;

import com.eliab.controleestudos.model.Sessao;
import com.eliab.controleestudos.service.HistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/historico")
public class HistoricoController {

    @Autowired
    private HistoricoService historicoService;

    @GetMapping("filtra-por-data/{id}")
    public ResponseEntity<?> filtrarPorData(@PathVariable Long id, @RequestParam String data) {
        LocalDateTime dataConvertida = LocalDateTime.parse(data); // Converte para LocalDateTime
        return ResponseEntity.ok(historicoService.filtrarPorData(id, dataConvertida));
    }
    @GetMapping("filtra-por-disciplina/{id}")
    public ResponseEntity<?> filtrarPorDisciplina(@PathVariable Long id, @RequestParam String disciplina){
        return ResponseEntity.ok(historicoService.filtrarPorDisciplina(id,disciplina));
        }
    }
