import { database } from '../lib/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { auth } from '../lib/firebaseConfig';

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
    console.error('Erro: Usuário não autenticado');
    return () => {};
  }

  const uid = user.uid;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const transactionsRef = ref(database, `users/${uid}/transactions/${currentYear}/${currentMonth}`);

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
