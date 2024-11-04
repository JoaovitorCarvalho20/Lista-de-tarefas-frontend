// src/components/tarefas/TarefaItem.tsx
import React from 'react';
import { TarefasDTO } from '../../types/TarefasDTO';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

interface TarefaItemProps {
  tarefa: TarefasDTO;
  onEdit: (tarefa: TarefasDTO) => void;
  onDelete: (id: number) => Promise<void>;
  onMoveUp: (id: number) => void; // Função para mover a tarefa para cima
  onMoveDown: (id: number) => void; // Função para mover a tarefa para baixo
}

const TarefaItem: React.FC<TarefaItemProps> = ({ tarefa, onEdit, onDelete, onMoveUp, onMoveDown }) => {
  const handleEdit = () => onEdit(tarefa);
  const handleDelete = () => onDelete(tarefa.id);
  const handleMoveUp = () => onMoveUp(tarefa.id);
  const handleMoveDown = () => onMoveDown(tarefa.id);

  return (
    <div className={`flex items-center justify-between p-4 border rounded-lg ${tarefa.custo >= 1000 ? 'bg-yellow-200' : 'bg-white'}`}>
      <div className="flex flex-col">
        <span className="font-semibold text-lg">{tarefa.nome}</span>
        <span className="text-gray-600">Custo: R$ {tarefa.custo}</span>
        <span className="text-gray-600">Data Limite: {new Date(tarefa.dataLimite).toLocaleDateString()}</span>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={handleMoveUp} className="text-blue-500 hover:text-blue-700">
          <AiOutlineArrowUp size={20} />
        </button>
        <button onClick={handleMoveDown} className="text-blue-500 hover:text-blue-700">
          <AiOutlineArrowDown size={20} />
        </button>
        <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
          <AiOutlineEdit size={20} />
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <AiOutlineDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default TarefaItem;
