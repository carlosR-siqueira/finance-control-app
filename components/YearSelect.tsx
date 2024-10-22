import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const YearPickerComponent = () => {
  // Estado para armazenar a data selecionada (inicialmente a data atual)
  const [currentDate, setCurrentDate] = useState(new Date());

  // Função executada quando o componente é montado para capturar a data automaticamente
  useEffect(() => {
    // Captura a data atual ao abrir o app
    const now = new Date();
    setCurrentDate(now);
  }, []); // O array vazio [] garante que o efeito é executado apenas na montagem

  // Formatação da data para exibição (sem hora)
  const formattedDate = currentDate.toLocaleDateString(); // Formata para o formato local, apenas com a data

  return (
    <View style={styles.container}>
      <Icon name="calendar" size={14} color="#24b" style={styles.icon} />
      <Text style={styles.selectedText}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10, // Espaçamento entre o ícone e o texto da data
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#24b',
  },
});

export default YearPickerComponent;
