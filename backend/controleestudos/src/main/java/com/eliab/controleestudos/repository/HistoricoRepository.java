package com.eliab.controleestudos.repository;

import com.eliab.controleestudos.model.Historico;
import com.eliab.controleestudos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    Optional<Historico> findByUsuario(Usuario usuario);
}
