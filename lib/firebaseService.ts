// lib/firebaseService.ts
import { database } from './firebaseConfig';
import { ref, set } from "firebase/database";

// Função para escrever dados
export const writeTransaction = async (transactionId: string, description: string, value: number, type: 'income' | 'outcome', month: string) => {
  try {
    // Verificação simples antes de salvar
    if (!transactionId || !description || isNaN(value) || !type || month === 'Escolha um Mês') {
      throw new Error('Dados da transação inválidos');
    }

    // Salvar a transação no Firebase
    await set(ref(database, `${month}/${transactionId}`), {
      description,
      value,
      type,
      month,
      timestamp: Date.now() // Opcional: pode adicionar um timestamp
    });

    console.log('Transação salva com sucesso');
  } catch (error) {
    console.error('Erro ao salvar a transação:', error);
  }
};
