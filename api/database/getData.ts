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

export const subscribeToTransactions = (callback: (transactions: Transaction[]) => void) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("Erro: Usuário não autenticado.");
    return () => {};
  }

  const uid = user.uid;
  const transactionsRef = ref(database, `users/${uid}/transactions`);

  const unsubscribe = onValue(transactionsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedTransactions: Transaction[] = [];

    if (data) {
      Object.keys(data).forEach((year) => {
        Object.keys(data[year]).forEach((month) => {
          ['Entrada', 'Saida'].forEach((tipo) => {
            if (data[year][month][tipo]) {
              Object.values(data[year][month][tipo]).forEach((item: any) => {
                loadedTransactions.push({
                  description: item.description,
                  value: item.value,
                  month,
                  type: tipo === 'Entrada' ? 'income' : 'outcome',
                  timestamp: item.timestamp,
                });
              });
            }
          });
        });
      });
    }

    // Ordena por timestamp (mais antigas primeiro)
    loadedTransactions.sort((a, b) => a.timestamp - b.timestamp);
    
    callback(loadedTransactions);
  });

  return unsubscribe;
};


export const subscribeToYears = (callback: (years: string[]) => void) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('Erro: Usuário não autenticado');
    return () => {};
  }

  const uid = user.uid;
  const yearsRef = ref(database, `users/${uid}/transactions`);

  const unsubscribe = onValue(yearsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedYears = Object.keys(data || {});
    callback(loadedYears);
  });

  return unsubscribe;
};

export const subscribeToMonths = (year: string, callback: (months: string[]) => void) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('Erro: Usuário não autenticado');
    return () => {};
  }

  const uid = user.uid;
  const monthsRef = ref(database, `users/${uid}/transactions/${year}`);

  const unsubscribe = onValue(monthsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedMonths = Object.keys(data || {});
    callback(loadedMonths);
  });

  return unsubscribe;
};
