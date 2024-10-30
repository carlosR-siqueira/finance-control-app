// components/transactionFullList.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const TransactionDetails: React.FC<{ transactions: any[]; month: string }> = ({ transactions, month }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transações do Mês: {month}</Text>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma transação registrada.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.description} - {item.value}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
  },
});

export default TransactionDetails;
