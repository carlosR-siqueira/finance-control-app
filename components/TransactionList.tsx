// components/TransactionList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import {Transaction } from '../api/getData';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

// Defina a interface para as props do componente
interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (timestamp: number) => void; // Adicionando tipo para a função de deletar
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Atualiza as transações recentes toda vez que a lista de transações mudar
    setRecentTransactions(
      transactions
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5)
    );
  }, [transactions]); // Dependência de transactions

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
        recentTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.timestamp}
            transaction={transaction}
            onDelete={() => onDeleteTransaction(transaction.timestamp)} // Chama a função de deletar
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

export default TransactionList;
