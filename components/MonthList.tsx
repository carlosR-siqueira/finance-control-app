import React from 'react';
import { View, StyleSheet } from 'react-native';
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

// Define os tipos das props
interface DropdownMonthsProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const DropdownMonths: React.FC<DropdownMonthsProps> = ({ selectedMonth, onMonthChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={onMonthChange}
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
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
});

export default DropdownMonths;
