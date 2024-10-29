// firebaseApi.ts
import { database } from '../lib/firebaseConfig'; // Ajuste o caminho para seu arquivo de configuração do Firebase
import { ref, onValue } from 'firebase/database';

export interface Transaction {
  timestamp: number; // Altera para número para melhor uso
  description: string;
  value: number;
  month: string;
  type: 'income' | 'outcome';
}

export const subscribeToTransactions = (callback: (transactions: Transaction[]) => void) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const currentMonth = monthNames[currentDate.getMonth()];

  const transactionsRef = ref(database, `${currentYear}/${currentMonth}`); // Caminho até os dados do ano e mês atuais

  const unsubscribe = onValue(transactionsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedTransactions: Transaction[] = [];

    // Processa dados de "Entrada" e "Saida"
    if (data) {
      ['Entrada', 'Saida'].forEach((tipo) => {
        if (data[tipo]) {
          Object.values(data[tipo]).forEach((item: any) => {
            loadedTransactions.push({
              description: item.description,
              value: item.value,
              month: item.month,
              type: tipo === 'Entrada' ? 'income' : 'outcome',
              timestamp: item.timestamp, // Atribui o timestamp corretamente
            });
          });
        }
      });
    }

    // Ordena as transações pelo timestamp (do mais recente para o mais antigo)
    loadedTransactions.sort((a, b) => b.timestamp - a.timestamp);

    callback(loadedTransactions);
  });

  return unsubscribe;
};
 