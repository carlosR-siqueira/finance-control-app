// api/postData.ts
import { database } from '../lib/firebaseConfig';
import { ref, set } from 'firebase/database';

// Função para escrever dados
export const writeTransaction = async (
  transactionId: string,
  description: string,
  value: number,
  type: 'income' | 'outcome'
) => {
  try {
    // Verificação simples antes de salvar
    if (!transactionId || !description || isNaN(value) || !type) {
      throw new Error('Dados da transação inválidos');
    }

    // Obter a data atual
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-BR'); 
    const currentYear = currentDate.getFullYear(); 

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const currentMonth = monthNames[currentDate.getMonth()]; 

    const typeNames = [
      'Entrada', 'Saida'
    ];
    const transactionType = typeNames[type === 'income' ? 0 : 1]; 

    // Salvar a transação no Firebase
    await set(ref(database, `${currentYear}/${currentMonth}/${transactionType}/${transactionId}`), {
      description,
      value,
      type,
      month: currentMonth, 
      date: formattedDate, 
      timestamp: Date.now() 
    });

    console.log('Transação salva com sucesso');
  } catch (error) {
    console.error('Erro ao salvar a transação:', error);
  }
};
