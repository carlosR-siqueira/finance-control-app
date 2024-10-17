import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const YearPickerComponent = () => {
  // Estado para armazenar o ano selecionado (inicialmente o ano atual)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Função executada quando o componente é montado para capturar o ano automaticamente
  useEffect(() => {
    // Captura o ano atual ao abrir o app
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear);
  }, []); // O array vazio [] garante que o efeito é executado apenas na montagem

  return (
    <View style={styles.container}>
      <Icon name="calendar" size={14} color="#24b" style={styles.icon}> <Text style={styles.selectedText}>{selectedYear}</Text></Icon>
      
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
    marginRight: 10, // Espaçamento entre o ícone e o texto do ano
  },

  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#24b'
  },
});

export default YearPickerComponent;
