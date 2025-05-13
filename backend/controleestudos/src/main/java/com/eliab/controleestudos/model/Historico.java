package com.eliab.controleestudos.model;

import jakarta.persistence.Entity;
import lombok.Data;

import java.time.Duration;

@Data
@Entity
public class Historico {
    
    private Sessao sessoes;
    private Duration totalHoras;

    public Historico(){
    }

    public Historico(Sessao sessoes, Duration totalHoras){
        this.sessoes = sessoes;
        this.totalHoras = totalHoras;
    }

    public void filtrarPorData(){
    }
    public void filtrarPorDisciplina(){
    }
}
