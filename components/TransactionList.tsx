import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';

interface Transaction {
  description: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (index: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Descrição</Text>
        <Text style={styles.headerText}>Valor</Text>
        <Text style={styles.headerText}>Tipo</Text>
        <Text style={styles.headerText}>Ação</Text>
      </View>
      {transactions.map((transaction, index) => (
        <TransactionItem
          key={index}
          transaction={transaction}
          onDelete={() => onDeleteTransaction(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    flex: 1, // Cada coluna ocupa o mesmo espaço
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TransactionList;
