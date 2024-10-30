// app/MonthListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Avatar, Card, IconButton, Menu, Button, Provider } from 'react-native-paper';
import { subscribeToYears, subscribeToMonths } from '@/api/getData';
import { useRouter } from 'expo-router';

const MonthListScreen: React.FC = () => {
  const [years, setYears] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isYearMenuVisible, setIsYearMenuVisible] = useState(false);
  const router = useRouter();

  // Carregar anos disponíveis do Firebase
  useEffect(() => {
    const unsubscribe = subscribeToYears((data) => {
      setYears(data);
      setSelectedYear(null); // Resetar ano selecionado
      setMonths([]); // Limpa os meses ao carregar novos anos
    });

    return () => unsubscribe();
  }, []);

  // Carregar meses quando o ano selecionado mudar
  useEffect(() => {
    if (selectedYear) {
      const unsubscribe = subscribeToMonths(selectedYear, (monthsList) => {
        setMonths(monthsList);
      });

      return () => unsubscribe();
    }
  }, [selectedYear]);

  const handleMonthPress = (month: string) => {
    router.push(`/transactionDetails?month=${month}&year=${selectedYear}`); // Passa o mês e o ano
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Menu
          visible={isYearMenuVisible}
          onDismiss={() => setIsYearMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setIsYearMenuVisible(true)}>
              {selectedYear || 'Selecione o Ano'}
            </Button>
          }
        >
          {years.map((year) => (
            <Menu.Item
              key={year}
              onPress={() => {
                setSelectedYear(year);
                setIsYearMenuVisible(false);
              }}
              title={year}
            />
          ))}
        </Menu>

        {selectedYear && (
          <FlatList
            data={months}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Card style={styles.card} onPress={() => handleMonthPress(item)}>
                <Card.Title
                  title={item}
                  left={(props) => <Avatar.Icon {...props} icon="calendar-month" />}
                  right={(props) => <IconButton {...props} icon="chevron-right" />}
                />
              </Card>
            )}
          />
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    elevation: 3,
  },
});

export default MonthListScreen;
