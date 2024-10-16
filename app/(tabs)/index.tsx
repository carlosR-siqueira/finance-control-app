import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppHeader from '@/components/AppHeader';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

interface Transaction {
  description: string;
  value: number;
  type: 'income' | 'outcome';
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
    <View style={styles.container}>
      <AppHeader transactions={transactions} calculateTotal={calculateTotal} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
    </View>
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
