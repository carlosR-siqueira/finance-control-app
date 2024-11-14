import { database } from '../lib/firebaseConfig';
import { ref, set } from 'firebase/database';
import { auth } from '../lib/firebaseConfig'; // Para acessar o usuário atual

export const writeTransaction = async (
  transactionId: string,
  description: string,
  value: number,
  type: 'income' | 'outcome'
) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    const uid = user.uid;

    if (!transactionId || !description || isNaN(value) || !type) {
      throw new Error('Dados da transação inválidos');
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-BR');
    const currentYear = currentDate.getFullYear();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const currentMonth = monthNames[currentDate.getMonth()];

    const transactionType = type === 'income' ? 'Entrada' : 'Saida';

    // Definir o caminho exato onde os dados da transação serão salvos
    const transactionRef = ref(database, `users/${uid}/transactions/${currentYear}/${currentMonth}/${transactionType}/${transactionId}`);

    // Salvar a transação no Firebase Realtime Database
    await set(transactionRef, {
      description,
      value,
      type: transactionType,
      month: currentMonth,
      date: formattedDate,
      timestamp: Date.now()
    });

    console.log('Transação salva com sucesso');
  } catch (error) {
    console.error('Erro ao salvar a transação:', error);
  }
};
