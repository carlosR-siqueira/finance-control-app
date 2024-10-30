// getData.ts
import { database } from '../lib/firebaseConfig'; // Ajuste o caminho para seu arquivo de configuração do Firebase
import { ref, onValue } from 'firebase/database';

export interface Transaction {
  timestamp: number; // Altera para número para melhor uso
  description: string;
  value: number;
  month: string;
  type: 'income' | 'outcome';
}

// Função para buscar as transações do ano e mês atuais
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

// Função para buscar os anos disponíveis
export const subscribeToYears = (callback: (years: string[]) => void) => {
  const yearsRef = ref(database, '/'); // Ponto de partida para buscar os anos

  const unsubscribe = onValue(yearsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedYears = Object.keys(data || {}); // Obtém os anos como uma lista

    callback(loadedYears);
  });

  return unsubscribe;
};

// Função para buscar os meses disponíveis para um ano específico
export const subscribeToMonths = (year: string, callback: (months: string[]) => void) => {
  const monthsRef = ref(database, `/${year}`); // Caminho para os meses do ano

  const unsubscribe = onValue(monthsRef, (snapshot) => {
    const data = snapshot.val();
    const loadedMonths = Object.keys(data || {}); // Obtém os meses como uma lista
    callback(loadedMonths);
  });

  return unsubscribe;
};
