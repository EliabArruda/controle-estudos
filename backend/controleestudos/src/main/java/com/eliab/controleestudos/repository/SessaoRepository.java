package com.eliab.controleestudos.repository;

import com.eliab.controleestudos.model.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao,Long> {
}
