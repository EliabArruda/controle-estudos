package com.eliab.controleestudos.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.util.List;

@Data
@Entity
public class Historico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "historico_id")
    private List<Sessao> sessoes;

    private Duration totalHoras;
}
