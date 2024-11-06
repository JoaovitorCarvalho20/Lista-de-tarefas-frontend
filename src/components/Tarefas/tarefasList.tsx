import React, { useEffect, useState } from "react";
import TarefaItem from "./tarefaItem";
import { TarefasDTO } from "@/types/TarefasDTO";

const TarefasList: React.FC = () => {
  const [tarefas, setTarefas] = useState<TarefasDTO[]>([]);
  const [novaTarefa, setNovaTarefa] = useState<TarefasDTO>({
    id: 0,
    nome: "",
    custo: 0,
    dataLimite: "",
    ordemDeApresentacao: 0,
  });
  const [tarefaEditando, setTarefaEditando] = useState<TarefasDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Atualizar a URL do fetch para a URL pública do ngrok
  const BASE_URL = "https://d5c2-177-74-238-140.ngrok-free.app"; // Substitua pela sua URL ngrok

  const fetchTarefas = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tarefas`);
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir esta tarefa?"
    );
    if (confirmDelete) {
      try {
        await fetch(`${BASE_URL}/tarefas/${id}`, {
          method: "DELETE",
        });
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tarefas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaTarefa),
      });

      if (response.ok) {
        const tarefaCriada = await response.json();
        setTarefas([...tarefas, tarefaCriada]);
        setNovaTarefa({
          id: 0,
          nome: "",
          custo: 0,
          dataLimite: "",
          ordemDeApresentacao: 0,
        });
      } else {
        console.error("Erro ao adicionar tarefa:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const handleEdit = async () => {
    if (!tarefaEditando) return;

    try {
      const response = await fetch(
        `${BASE_URL}/tarefas/${tarefaEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarefaEditando),
        }
      );

      if (response.ok) {
        let tarefaAtualizada;

        if (
          response.headers.get("content-length") &&
          Number(response.headers.get("content-length")) > 0
        ) {
          tarefaAtualizada = await response.json();
        } else {
          tarefaAtualizada = tarefaEditando;
        }

        setTarefas(
          tarefas.map((tarefa) =>
            tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
          )
        );
        setTarefaEditando(null);
        setIsModalOpen(false);
      } else {
        console.error("Erro ao editar tarefa:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  const handleEditClick = (tarefa: TarefasDTO) => {
    setTarefaEditando(tarefa);
    setIsModalOpen(true);
  };

  // Função para mover a tarefa para cima
  const handleMoveUp = async (id: number) => {
    const index = tarefas.findIndex((tarefa) => tarefa.id === id);
    if (index > 0) {
      const newOrder = [...tarefas];
      [newOrder[index - 1], newOrder[index]] = [
        newOrder[index],
        newOrder[index - 1],
      ];
      setTarefas(newOrder);
      await updateOrder(newOrder.map((t) => t.id));
    }
  };

  // Função para mover a tarefa para baixo
  const handleMoveDown = async (id: number) => {
    const index = tarefas.findIndex((tarefa) => tarefa.id === id);
    if (index < tarefas.length - 1) {
      const newOrder = [...tarefas];
      [newOrder[index + 1], newOrder[index]] = [
        newOrder[index],
        newOrder[index + 1],
      ];
      setTarefas(newOrder);
      await updateOrder(newOrder.map((t) => t.id));
    }
  };

  // Função para atualizar a ordem das tarefas no backend
  const updateOrder = async (ids: number[]) => {
    try {
      await fetch(`${BASE_URL}/tarefas/ordem`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      });
    } catch (error) {
      console.error("Erro ao atualizar a ordem das tarefas:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>

      {/* Formulário para adicionar tarefa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome da tarefa"
          value={novaTarefa.nome}
          onChange={(e) =>
            setNovaTarefa({ ...novaTarefa, nome: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Custo"
          value={novaTarefa.custo}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value) && Number(value) >= 0) {
              setNovaTarefa({ ...novaTarefa, custo: Number(value) });
            }
          }}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={novaTarefa.dataLimite}
          onChange={(e) =>
            setNovaTarefa({ ...novaTarefa, dataLimite: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Adicionar Tarefa
        </button>
      </div>

      {/* Lista de tarefas */}
      <div className="space-y-2">
        {tarefas.map((tarefa) => (
          <TarefaItem
            key={tarefa.id}
            tarefa={tarefa}
            onDelete={handleDelete}
            onEdit={() => handleEditClick(tarefa)}
            onMoveUp={() => handleMoveUp(tarefa.id)} // Passa a função de mover para cima
            onMoveDown={() => handleMoveDown(tarefa.id)} // Passa a função de mover para baixo
          />
        ))}
      </div>

      {/* Modal para edição */}
      {isModalOpen && tarefaEditando && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Editar Tarefa</h2>
            <input
              type="text"
              placeholder="Nome da tarefa"
              value={tarefaEditando.nome}
              onChange={(e) =>
                setTarefaEditando({ ...tarefaEditando, nome: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Digite o custo da tarefa"
              value={tarefaEditando.custo.toString()}
              onChange={(e) => {
                const value = e.target.value;
                const numValue = Number(value);
                if (!isNaN(numValue) && numValue >= 0) {
                  setTarefaEditando({ ...tarefaEditando, custo: numValue });
                }
              }}
              className="border p-2 mb-2 w-full"
            />

            <input
              type="date"
              value={tarefaEditando.dataLimite}
              onChange={(e) =>
                setTarefaEditando({
                  ...tarefaEditando,
                  dataLimite: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarefasList;
