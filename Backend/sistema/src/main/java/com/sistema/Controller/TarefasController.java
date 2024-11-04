package com.sistema.Controller;

import com.sistema.Dto.TarefasDTO;
import com.sistema.Service.TarefasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Usando @RestController para que o controlador retorne JSON
@RequestMapping("/tarefas") // Mapeia a URL base
@CrossOrigin(origins = "http://localhost:3000")
public class TarefasController {

    @Autowired
    private TarefasService tarefasService;

    // Método para listar todas as tarefas
    @GetMapping
    public ResponseEntity<List<TarefasDTO>> listarTarefas() {
        List<TarefasDTO> tarefas = tarefasService.listarTarefas();
        return ResponseEntity.ok(tarefas); // Retorna as tarefas com status 200 OK
    }

    // Método para criar uma nova tarefa
    @PostMapping
    public ResponseEntity<TarefasDTO> criarTarefa(@RequestBody TarefasDTO tarefaDto) {
        TarefasDTO novaTarefa = tarefasService.criarTarefas(tarefaDto);
        if (novaTarefa == null) {
            return ResponseEntity.badRequest().build(); // Retorna 400 Bad Request se o nome já existe
        }
        return ResponseEntity.status(201).body(novaTarefa); // Retorna a nova tarefa com status 201 Created
    }

    // Endpoint para atualizar a ordem das tarefas
    @PutMapping("/ordem")
    public void atualizarOrdem(@RequestBody List<Long> ids) {
        tarefasService.atualizarOrdem(ids);
    }

    // Método para editar uma tarefa
    @PutMapping("/{id}")
    public ResponseEntity<Void> editarTarefa(@PathVariable Long id, @RequestBody TarefasDTO tarefaDto) {
        if (tarefasService.editarTarefas(id, tarefaDto)) {
            return ResponseEntity.ok().build(); // Retorna 200 OK se a edição foi bem-sucedida
        }
        return ResponseEntity.notFound().build(); // Retorna 404 Not Found se a tarefa não foi encontrada ou se o nome já existe
    }

    // Método para excluir uma tarefa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTarefa(@PathVariable Long id) {
        if (tarefasService.excluirTarefas(id)) {
            return ResponseEntity.noContent().build(); // Retorna 204 No Content se a exclusão foi bem-sucedida
        }
        return ResponseEntity.notFound().build(); // Retorna 404 Not Found se a tarefa não foi encontrada
    }
}
