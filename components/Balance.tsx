import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Transaction {
  description: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BalanceProps {
  transactions: Transaction[];
  calculateTotal: () => number;
}

const Balance: React.FC<BalanceProps> = ({ transactions, calculateTotal }) => {
  const totalIncome = transactions.reduce((acc, transaction) =>
    transaction.type === 'income' ? acc + transaction.value : acc,
    0,
  );

  const totalOutcome = transactions.reduce((acc, transaction) =>
    transaction.type === 'outcome' ? acc + transaction.value : acc,
    0,
  );

  return (
    <View style={styles.header}>
      <View style={styles.headerItem}>
      <Icon name="arrow-up" size={20} color="green"/>
        <Text style={styles.headerTitle}>Entradas</Text>
        <Text style={styles.headerValue}>R$ {totalIncome.toFixed(2)}</Text>
      </View>
      <View style={styles.headerItem}>
      <Icon name="arrow-down" size={20} color="red" />
        <Text style={styles.headerTitle}>Saídas </Text>
        <Text style={styles.headerValue}>R$ {totalOutcome.toFixed(2)}</Text>
      </View>
      {/* <View style={styles.headerItem}>
        <Text style={styles.headerTitle}>Saldo</Text>
        <Text style={styles.headerValue}>R$ {calculateTotal().toFixed(2)}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerValue: {
    fontSize: 16,
  },
});

export default Balance;
