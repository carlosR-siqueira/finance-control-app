import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import { subscribeToTransactions, Transaction } from '../api/getData';
import { Button } from 'react-native-paper';

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToTransactions(setTransactions);

    // Limpa a subscrição ao desmontar o componente
    return () => unsubscribe();
  }, []);

  // Filtra para mostrar apenas as cinco transações mais recentes
  const recentTransactions = transactions
    .sort((a, b) => b.timestamp - a.timestamp) // Ordena por timestamp (do mais recente para o mais antigo)
    .slice(0, 5); // Pega apenas as cinco mais recentes

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transações Recentes</Text>

      <View style={styles.header}>
        <Text style={styles.headerText}>Descrição</Text>
        <Text style={styles.headerText}>Valor</Text>
        <Text style={styles.headerText}>Tipo</Text>
        <Text style={styles.headerText}>Ação</Text>
      </View>

      {recentTransactions.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma transação registrada.</Text>
      ) : (
        recentTransactions.map((transaction, index) => (
          <TransactionItem
            key={transaction.timestamp} // Use o timestamp como key para garantir unicidade
            transaction={transaction}
            onDelete={() => console.log('Implementar delete')} // Ajuste conforme necessário
          />
        ))
      )}

      <Button style={styles.btn} icon="bank-transfer" mode="contained" onPress={() => console.log('Pressed')}>
        Todas as Transações
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#4CAF50',
    marginVertical: 10,
  },
});

export default TransactionList;
