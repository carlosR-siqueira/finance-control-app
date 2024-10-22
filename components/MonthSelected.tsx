// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import YearPickerComponent from '../components/YearSelect';
// import DropdownMonths from '../components/MonthList';

// const ParentComponent = () => {
//   const [selectedMonth, setSelectedMonth] = useState('Escolha um Mês');

//   // Função para lidar com a mudança do mês
//   const handleMonthChange = (month: any) => {
//     const monthNames = [
//       'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
//       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
//     ];
//     setSelectedMonth(monthNames[month]); // Armazena o mês atual como string
//   };

//   return (
//     <View style={styles.container}>
//       <YearPickerComponent onMonthChange={handleMonthChange} />
//       <DropdownMonths selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
// });

// export default ParentComponent;
