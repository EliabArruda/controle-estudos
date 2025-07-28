package com.eliab.controleestudos.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Historico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "historico_id")
    private List<Sessao> sessoes;

    private Duration totalHoras;

    public Historico(Usuario usuario, List<Sessao> sessoes){
        this.usuario = usuario;
        this.sessoes = sessoes != null ? sessoes : new ArrayList<>();
    }
    public Historico(){
    }
}
