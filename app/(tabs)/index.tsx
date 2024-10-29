import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import Balance from '@/components/Balance';
import TotBalance from '@/components/TotalBalance';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import YearSelect from '@/components/YearSelect';
import { subscribeToTransactions } from '@/api/getData'; // Ajuste o caminho conforme necessário

interface Transaction {
  description: string;
  value: number;
  type: 'income' | 'outcome';
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // UseEffect para assinar transações do Firebase
  useEffect(() => {
    const unsubscribe = subscribeToTransactions(setTransactions);
    return () => unsubscribe();
  }, []);

  const loadTransactions = async () => {
    setRefreshing(true);
    const unsubscribe = subscribeToTransactions(setTransactions);
    setRefreshing(false);
    return () => unsubscribe();
  };

  const handleAddTransaction = (description: string, value: number, type: 'income' | 'outcome') => {
    const newTransaction: Transaction = {
      description,
      value,
      type,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const totalIncome = transactions.reduce((acc, transaction) =>
      transaction.type === 'income' ? acc + transaction.value : acc,
      0,
    );
    const totalOutcome = transactions.reduce((acc, transaction) =>
      transaction.type === 'outcome' ? acc + transaction.value : acc,
      0,
    );
    return totalIncome - totalOutcome;
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadTransactions} // Chama a função para carregar as transações novamente
        />
      }
    >
      <TotBalance transactions={transactions} />
      <YearSelect />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <Balance transactions={transactions} calculateTotal={calculateTotal} />
      <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:  '#fff',
  },
});

export default App;
