import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Paragraph, IconButton } from 'react-native-paper';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { subscribeToTransactions, Transaction } from '@/api/getAllData';

const TransactionDetails: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { month, year } = useLocalSearchParams();

  useEffect(() => {
    if (year && month) {
      const unsubscribe = subscribeToTransactions(year as string, month as string, (fetchedTransactions) => {
        setTransactions(fetchedTransactions);
      });

      return () => unsubscribe();
    }
  }, [month, year]);

  return (
    
  
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{month}/{year}</Text>

      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma transação registrada.</Text>
      ) : (
        transactions.map((transaction) => (
          <Card key={transaction.timestamp} style={styles.card}>
            <Card.Title 
              title={transaction.description} 
              subtitle={transaction.type === 'income' ? 'Entrada' : 'Saída'} 
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
              
            />

            
            <Card.Content>
              <Paragraph>Valor: R$ {transaction.value.toFixed(2)}</Paragraph>
              <Paragraph>Data: {new Date(transaction.timestamp).toLocaleDateString()}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}

          

      <Link href="/explore" asChild>
        <Button style={styles.btn} icon="bank-transfer" mode="contained">
          Voltar
        </Button>
      </Link>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    elevation: 3,
    
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#4CAF50',
    marginVertical: 30,
    
  },
});

export default TransactionDetails;
