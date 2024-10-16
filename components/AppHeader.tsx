import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  transactions: { value: number; type: 'income' | 'outcome' }[];
  calculateTotal: () => number;
}

const Header: React.FC<HeaderProps> = ({ transactions, calculateTotal }) => {
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
        <Text style={styles.headerTitle}>Entradas</Text>
        <Text style={styles.headerValue}>R$ {totalIncome.toFixed(2)}</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerTitle}>Saídas</Text>
        <Text style={styles.headerValue}>R$ {totalOutcome.toFixed(2)}</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerTitle}>Total</Text>
        <Text style={styles.headerValue}>R$ {calculateTotal().toFixed(2)}</Text>
      </View>
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

export default Header;
