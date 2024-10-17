import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const months = [
  { label: 'Escolha um Mês', value: 'Escolha um Mês' },
  { label: 'Janeiro', value: 'janeiro' },
  { label: 'Fevereiro', value: 'fevereiro' },
  { label: 'Março', value: 'marco' },
  { label: 'Abril', value: 'abril' },
  { label: 'Maio', value: 'maio' },
  { label: 'Junho', value: 'junho' },
  { label: 'Julho', value: 'julho' },
  { label: 'Agosto', value: 'agosto' },
  { label: 'Setembro', value: 'setembro' },
  { label: 'Outubro', value: 'outubro' },
  { label: 'Novembro', value: 'novembro' },
  { label: 'Dezembro', value: 'dezembro' },
];

const DropdownMonths = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[0].value);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Selecione um mês:</Text> */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
        >
          {months.map((month) => (
            <Picker.Item key={month.value} label={month.label} value={month.value} />
          ))}
        </Picker>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc', // Cor da borda
    borderRadius: 8, // Borda arredondada
    paddingHorizontal: 10, // Preenchimento horizontal dentro do campo
    backgroundColor: '#fff', // Cor de fundo branca, como um input
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000', // Cor do texto
  },
  selectedText: {
    margin: 20,
    fontSize: 16,
  },
});

export default DropdownMonths;
