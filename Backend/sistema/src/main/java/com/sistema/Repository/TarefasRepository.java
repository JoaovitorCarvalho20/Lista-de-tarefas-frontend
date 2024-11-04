package com.sistema.Repository;

import com.sistema.Entity.Tarefas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TarefasRepository extends JpaRepository<Tarefas, Long> {
    // MEtodo que vai garantir que nao exista nomes duplicados
    Optional<Tarefas> findByNome(String nome);
}
