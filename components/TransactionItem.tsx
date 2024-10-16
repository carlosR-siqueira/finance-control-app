import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface TransactionItemProps {
  transaction: { description: string; value: number; type: 'income' | 'outcome' };
  onDelete: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
  return (
    <View style={styles.transaction}>
      <Text style={styles.transactionDescription}>{transaction.description}</Text>
      <Text style={styles.transactionValue}>R$ {transaction.value.toFixed(2)}</Text>
      <Text style={styles.transactionType}>{transaction.type === 'income' ? (<Icon name="arrow-up" size={20} color="green" />) : (<Icon name="arrow-down" size={20} color="red" />)}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  transaction: {
    flexDirection: 'row',
    gap:20,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  transactionDescription: {
    flex: 1, 
    textAlign: 'center',
    fontSize: 13,
  },
  transactionValue: {
    flex: 1, 
    textAlign: 'center',
    fontSize: 13,
  },
  transactionType: {
    flex: 1, 
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TransactionItem;
