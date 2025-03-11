import { database } from '../../lib/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { auth } from '../../lib/firebaseConfig';

export interface Transaction {
  timestamp: number;
  description: string;
  value: number;
  month: string;
  type: 'income' | 'outcome';
}

export const subscribeToTransactions = (year: string, month: string, callback: (transactions: Transaction[]) => void) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("Erro: Usuário não autenticado.");
    return () => {};
  }

  const uid = user.uid;

  if (!year || !month) {
    console.error("Ano ou mês inválido.");
    return () => {};
  }

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

    loadedTransactions.sort((a, b) => a.timestamp - b.timestamp);

    callback(loadedTransactions);
  });

  return unsubscribe;
};
