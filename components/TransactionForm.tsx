import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import MonthList  from './MonthList';
import YearSelect from './YearSelect';


interface TransactionFormProps {
  onAddTransaction: (description: string, value: number, type: 'income' | 'outcome') => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [newTransactionDescription, setNewTransactionDescription] = useState('');
  const [newTransactionValue, setNewTransactionValue] = useState('');
  const [newTransactionType, setNewTransactionType] = useState<'income' | 'outcome'>('income');

  const [text, setText] = React.useState("")
  const [number, setNumber] = React.useState("")

  const handleAddTransaction = () => {
    const value = parseFloat(newTransactionValue);
    
    if (!newTransactionDescription || isNaN(value)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente!');
      return;
    }

    onAddTransaction(newTransactionDescription, value, newTransactionType);
    setNewTransactionDescription('');
    setNewTransactionValue('');
    setNewTransactionType('income');
  };

  return (
    <View style={styles.form}>
      <MonthList />
      
      <TextInput
        mode='outlined'
        style={styles.inputBox}
        outlineStyle={styles.input}
        value={newTransactionDescription}
        label="Descrição"
        outlineColor='#ccc'
        activeOutlineColor='#4CAF50'
        onChangeText={newTransactionDescription => setNewTransactionDescription(newTransactionDescription)}
      />
      <TextInput
        mode='outlined'
        style={styles.inputBox}
        outlineStyle={styles.input}
        value={newTransactionValue}
        outlineColor='#ccc'
        activeOutlineColor='#4CAF50'
        label="Valor"
        onChangeText={newTransactionValue => setNewTransactionValue(newTransactionValue)}
        keyboardType="numeric"
      />
      <View style={styles.selectContainer}>
        <Text style={styles.selectLabel}>Tipo</Text>
        <TouchableOpacity
          style={[styles.selectButton, newTransactionType === 'income' ? styles.selectButtonActiveIn : styles.selectButtonInactive]}
          onPress={() => setNewTransactionType('income')}
        >
          <Text style={styles.selectButtonText}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectButton, newTransactionType === 'outcome' ? styles.selectButtonActiveOut : styles.selectButtonInactive]}
          onPress={() => setNewTransactionType('outcome')}
        >
          <Text style={styles.selectButtonText}>Saída</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    
  },
  input: {
  borderRadius: 8,

  },

  inputBox: {
    // marginVertical: 5,
  },
  selectContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 20,
  },
  selectLabel: {
    fontSize: 16,
  },
  selectButton: {
    padding: 10,
    borderRadius: 5,
  },
  selectButtonActiveIn: {
    backgroundColor: '#4CAF50',
  },
  selectButtonActiveOut: {
    backgroundColor: '#FF0000',
  },
  selectButtonInactive: {
    backgroundColor: '#ccc',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#24b2f9',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',

  },
});

export default TransactionForm;
