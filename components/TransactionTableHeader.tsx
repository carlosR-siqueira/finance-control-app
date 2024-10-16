import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionTableHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerItem}>Descrição</Text>
      <Text style={styles.headerItem}>Valor</Text>
      <Text style={styles.headerItem}>Tipo</Text>
      <Text style={styles.headerItem}>-</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
   justifyContent:  'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  headerItem: {
    flex:  1,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto
  },
});

export default TransactionTableHeader;
