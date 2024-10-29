import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from './ThemeContext'; // Ajuste o caminho conforme necessário

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <View>
      <Button
        title="Tema Claro"
        onPress={() => setTheme('light')}
        disabled={theme === 'light'}
      />
      <Button
        title="Tema Escuro"
        onPress={() => setTheme('dark')}
        disabled={theme === 'dark'}
      />
    </View>
  );
};

export default ThemeSwitcher;
