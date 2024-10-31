// api/getData.ts
import { database } from '../lib/firebaseConfig'; // Ajuste o caminho para seu arquivo de configuração do Firebase
import { ref, onValue } from 'firebase/database';

export interface Transaction {
  timestamp: number; // Altera para número para melhor uso
  description: string;
  value: number;
  month: string;
  type: 'income' | 'outcome';
}

// Função para buscar as transações de um ano e mês específicos
export const subscribeToTransactions = (year: string, month: string, callback: (transactions: Transaction[]) => void) => {
  if (!year || !month) {
    console.error("Year or month is invalid.");
    return () => {}; // Retorna uma função vazia se os parâmetros não forem válidos
  }

  const transactionsRef = ref(database, `/${year}/${month}`); // Caminho até os dados do ano e mês específicos

  const unsubscribe = onValue(transactionsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedTransactions: Transaction[] = [];

    if (data) {
      ['Entrada', 'Saida'].forEach((tipo) => {
        if (data[tipo]) {
          Object.values(data[tipo]).forEach((item: any) => {
            loadedTransactions.push({
              description: item.description,
              value: item.value,
              month: item.month,
              type: tipo === 'Entrada' ? 'income' : 'outcome',
              timestamp: item.timestamp,
            });
          });
        }
      });
    }

    loadedTransactions.sort((a, b) => b.timestamp - a.timestamp);
    callback(loadedTransactions);
  });

  return unsubscribe;
};


