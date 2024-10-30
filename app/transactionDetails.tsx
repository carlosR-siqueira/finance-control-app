import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionItem from '../components/TransactionList';
import { subscribeToTransactions, Transaction } from '../api/getData'; // Ajuste o caminho conforme necessário
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

interface TransactionDetailsProps {
  month: string; // ou number, dependendo de como você está armazenando
  year: string; // ou number
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ month, year }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToTransactions((allTransactions) => {
      // Filtrar transações pelo mês e ano
      const filteredTransactions = allTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.timestamp); // Certifique-se de que timestamp está no formato correto
        return transactionDate.getMonth() === parseInt(month) && transactionDate.getFullYear() === parseInt(year);
      });
      setTransactions(filteredTransactions);
    });
    return () => unsubscribe();
  }, [month, year]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transações para {month}/{year}</Text>

      <View style={styles.header}>
        <Text style={styles.headerText}>Descrição</Text>
        <Text style={styles.headerText}>Valor</Text>
        <Text style={styles.headerText}>Tipo</Text>
        <Text style={styles.headerText}>Ação</Text>
      </View>

      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma transação registrada.</Text>
      ) : (
        transactions.map((transaction) => (
          <TransactionItem
            key={transaction.timestamp}
            transaction={transaction}
            onDelete={() => console.log('Implementar delete')}
          />
        ))
      )}

      {/* Botão com Link para "Todas as Transações" */}
      <Link href="/explore" asChild>
        <Button style={styles.btn} icon="bank-transfer" mode="contained">
          Todas as Transações
        </Button>
      </Link>
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

export default TransactionDetails;
