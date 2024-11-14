// api/getAllData.ts
import { database } from '../lib/firebaseConfig'; // Ajuste o caminho para seu arquivo de configuração do Firebase
import { ref, onValue } from 'firebase/database';
import { auth } from '../lib/firebaseConfig';

export interface Transaction {
  timestamp: number;
  description: string;
  value: number;
  month: string;
  type: 'income' | 'outcome';
}

// Função para buscar as transações de um ano e mês específicos para o usuário logado
export const subscribeToTransactions = (year: string, month: string, callback: (transactions: Transaction[]) => void) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("Usuário não autenticado.");
    return () => {}; // Retorna uma função de cancelamento vazia se o usuário não estiver autenticado
  }

  const uid = user.uid;

  if (!year || !month) {
    console.error("Ano ou mês inválido.");
    return () => {}; // Retorna uma função vazia se os parâmetros não forem válidos
  }

  // Ref para o nó do usuário logado no ano e mês específicos
  const transactionsRef = ref(database, `users/${uid}/transactions/${year}/${month}`);

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

    // Ordena as transações pelo timestamp (do mais recente para o mais antigo)
    loadedTransactions.sort((a, b) => b.timestamp - a.timestamp);

    callback(loadedTransactions);
  });

  return unsubscribe;
};
