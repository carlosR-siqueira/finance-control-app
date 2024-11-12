import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl, ActivityIndicator, Text } from 'react-native';
import Balance from '@/components/Balance';
import TotBalance from '@/components/TotalBalance';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import YearSelect from '@/components/YearSelect';
import { subscribeToTransactions } from '@/api/getData';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'expo-router';


interface Transaction {
  description: string;
  value: number;
  type: 'income' | 'outcome';
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const router = useRouter();
  const auth = getAuth();

  // UseEffect para verificar a autenticação
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false); // Parar carregamento se o usuário estiver autenticado
      } else {
        router.replace('/login'); // Redireciona para a tela de login se não autenticado
      }
    });

    return unsubscribeAuth;
  }, []);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

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
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
