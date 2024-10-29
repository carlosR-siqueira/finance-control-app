// TotalBalance.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TotalBalanceProps {
  transactions: { value: number; type: 'income' | 'outcome' }[];
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ transactions }) => {
  // Calculando o saldo total
  const totalIncome = transactions.reduce((acc, transaction) =>
    transaction.type === 'income' ? acc + transaction.value : acc,
    0,
  );

  const totalOutcome = transactions.reduce((acc, transaction) =>
    transaction.type === 'outcome' ? acc + transaction.value : acc,
    0,
  );

  const totalBalance = totalIncome - totalOutcome;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saldo Total</Text>
      <Text style={styles.value}>R$ {totalBalance.toFixed(2)}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 22,
    color: 'green',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TotalBalance;
