package com.sistema.Service;

import com.sistema.Dto.TarefasDTO;
import com.sistema.Entity.Tarefas;
import com.sistema.Repository.TarefasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TarefasService {

    @Autowired
    private TarefasRepository tarefaRepository;

    // Converte uma entidade Tarefas para TarefasDTO
    private TarefasDTO converterDTO(Tarefas tarefa) {
        TarefasDTO dto = new TarefasDTO();
        dto.setId(tarefa.getId());
        dto.setNome(tarefa.getNome());
        dto.setCusto(tarefa.getCusto());
        dto.setDataLimite(tarefa.getDataLimite());
        // Não incluímos o campo ordemDeApresentacao aqui para o frontend
        return dto;
    }

    // Método para listar todas as tarefas ordenadas por ordem de apresentação
    public List<TarefasDTO> listarTarefas() {
        return tarefaRepository.findAll().stream()
                .sorted((t1, t2) -> t1.getOrdemDeApresentacao().compareTo(t2.getOrdemDeApresentacao()))
                .map(this::converterDTO)
                .collect(Collectors.toList());
    }

    // Método para excluir uma tarefa
    public Boolean excluirTarefas(Long id) {
        if (tarefaRepository.existsById(id)) {
            tarefaRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    // Método para editar uma tarefa
    public boolean editarTarefas(Long id, TarefasDTO tarefaDto) {
        // Verifica se a tarefa com o ID especificado existe
        if (tarefaRepository.existsById(id)) {
            // Verifica se já existe uma tarefa com o mesmo nome (excluindo o ID atual)
            Optional<Tarefas> tarefaExistente = tarefaRepository.findByNome(tarefaDto.getNome());
            if (tarefaExistente.isPresent() && !tarefaExistente.get().getId().equals(id)) {
                return false; // Retorna false se o nome já existe
            }

            // Obtém a tarefa atual, faz as alterações e salva
            Tarefas tarefa = tarefaRepository.findById(id).get();
            tarefa.setNome(tarefaDto.getNome());
            tarefa.setCusto(tarefaDto.getCusto());
            tarefa.setDataLimite(tarefaDto.getDataLimite());

            tarefaRepository.save(tarefa); // Salva as mudanças

            return true; // Retorna true se a edição foi bem-sucedida
        }
        return false; // Retorna false se a tarefa com o ID não existe
    }

    // Método para atualizar a ordem das tarefas
    public void atualizarOrdem(List<Long> ids) {
        for (int i = 0; i < ids.size(); i++) {
            Optional<Tarefas> tarefa = tarefaRepository.findById(ids.get(i));
            if (tarefa.isPresent()) {
                tarefa.get().setOrdemDeApresentacao((long) i); // Atualiza a ordem usando o índice
                tarefaRepository.save(tarefa.get());
            }
        }
    }

    // Método para criar uma nova tarefa
    public TarefasDTO criarTarefas(TarefasDTO tarefaDto) {
        // Verifica se o nome da tarefa já existe
        if (tarefaRepository.findByNome(tarefaDto.getNome()).isPresent()) {
            return null; // Nome já existe, então a criação não será realizada
        }

        // Define a tarefa e configura os campos
        Tarefas tarefa = new Tarefas();
        tarefa.setNome(tarefaDto.getNome());
        tarefa.setCusto(tarefaDto.getCusto());
        tarefa.setDataLimite(tarefaDto.getDataLimite());

        // Define a ordem de apresentação como a última posição
        long ultimaOrdem = tarefaRepository.count() + 1;
        tarefa.setOrdemDeApresentacao(ultimaOrdem);

        // Salva e converte para DTO
        Tarefas tarefaSalva = tarefaRepository.save(tarefa);
        return converterDTO(tarefaSalva);
    }
}
