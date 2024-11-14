// api/getData.ts
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

// Função para buscar as transações do ano e mês atuais para o usuário logado
export const subscribeToTransactions = (callback: (transactions: Transaction[]) => void) => {
  const user = auth.currentUser;

  if (!user) {
    console.error('Usuário não autenticado');
    return () => {}; // Retorna uma função de cancelamento vazia, pois o usuário não está logado
  }

  const uid = user.uid;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const currentMonth = monthNames[currentDate.getMonth()];

  // Ref para o nó do usuário no ano e mês atuais
  const transactionsRef = ref(database, `users/${uid}/transactions/${currentYear}/${currentMonth}`);

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

// Função para buscar os anos disponíveis para o usuário logado
export const subscribeToYears = (callback: (years: string[]) => void) => {
  const user = auth.currentUser;

  if (!user) {
    console.error('Usuário não autenticado');
    return () => {}; // Retorna uma função de cancelamento vazia
  }

  const uid = user.uid;
  const yearsRef = ref(database, `users/${uid}/transactions`); // Ponto de partida para buscar os anos

  const unsubscribe = onValue(yearsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedYears = Object.keys(data || {}); // Obtém os anos como uma lista

    callback(loadedYears);
  });

  return unsubscribe;
};

// Função para buscar os meses disponíveis para um ano específico do usuário logado
export const subscribeToMonths = (year: string, callback: (months: string[]) => void) => {
  const user = auth.currentUser;

  if (!user) {
    console.error('Usuário não autenticado');
    return () => {}; // Retorna uma função de cancelamento vazia
  }

  const uid = user.uid;
  const monthsRef = ref(database, `users/${uid}/transactions/${year}`); // Caminho para os meses do ano

  const unsubscribe = onValue(monthsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedMonths = Object.keys(data || {}); // Obtém os meses como uma lista
    callback(loadedMonths);
  });

  return unsubscribe;
};
