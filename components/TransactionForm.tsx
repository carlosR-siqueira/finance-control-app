import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { writeTransaction } from '../api/database/postData'; // Ajuste o caminho conforme necessário

interface TransactionFormProps {
  onAddTransaction: (description: string, value: number, type: 'income' | 'outcome') => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [newTransactionDescription, setNewTransactionDescription] = useState('');
  const [newTransactionValue, setNewTransactionValue] = useState('');
  const [newTransactionType, setNewTransactionType] = useState<'income' | 'outcome'>('income');
  const [selectedMonth, setSelectedMonth] = useState('Escolha um Mês');

  const handleAddTransaction = async () => {
    const value = parseFloat(newTransactionValue);
    
    if (!newTransactionDescription || isNaN(value)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente!');
      return;
    }

    // Gerar um ID único para a transação (por exemplo, usando a data atual)
    const transactionId = new Date().getTime().toString();

    // Chamar a função para salvar a transação no Firebase
    await writeTransaction(transactionId, newTransactionDescription, value, newTransactionType);
    
    // Chamar a função de callback
    onAddTransaction(newTransactionDescription, value, newTransactionType);

    // Resetar os campos do formulário
    setNewTransactionDescription('');
    setNewTransactionValue('');
    setNewTransactionType('income');
    setSelectedMonth('Escolha um Mês');
  };

  return (
    <View style={styles.form}>
      {/* <DropdownMonths selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} /> */}
      
      <TextInput
        mode="outlined"
        style={[styles.inputBox, { backgroundColor: 'transparent' }]} // Garante fundo transparente para não sobrepor o label
        value={newTransactionDescription}
        label="Descrição"
        outlineColor="#ccc"
        activeOutlineColor="#135e96"
        textColor="#000" // Força a cor do texto para evitar que suma no modo escuro
        theme={{
          colors: {
            primary: '#135e96', // Cor do contorno ao focar
            text: '#000',       // Cor do texto
            // background: 'transparent', // Evita que o fundo do input seja alterado
          },
        }} // Ajusta o tema
        onChangeText={setNewTransactionDescription}
      />
      <TextInput
        mode="outlined"
        style={[styles.inputBox, { backgroundColor: 'transparent' }]}
        value={newTransactionValue}
        label="Valor"
        outlineColor="#ccc"
        activeOutlineColor="#135e96"
        textColor="#000"
        theme={{
          colors: {
            primary: '#135e96', // Cor do contorno ao focar
            text: '#000',       // Cor do texto
            // background: 'transparent', // Evita que o fundo do input seja alterado
          },
        }}
        onChangeText={setNewTransactionValue}
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
  inputBox: {
    marginVertical: 5,
    borderRadius: 8,
    paddingLeft: 10, // Garante o espaçamento entre o texto e a borda
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
    color: '#000',
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
    backgroundColor: '#135e96',
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
