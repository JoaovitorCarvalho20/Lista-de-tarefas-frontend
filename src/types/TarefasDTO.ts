// src/types/TarefasDTO.ts

export interface TarefasDTO {
    id: number;
    nome: string;
    custo: number;
    dataLimite: string; // Pode ser Date, dependendo de como você quer tratar a data
    ordemDeApresentacao: number | null; // Pode ser null se não estiver definido
  }
  