// app/_layout.tsx

import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';

import { User } from 'firebase/auth'; // Importa o tipo User do firebase/auth
import { useColorScheme } from '@/hooks/useColorScheme'; // Importa o hook customizado de tema

import { ThemeProvider } from '../constants/ThemeContext'; // Caminho para o ThemeContext

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light'; // Define um valor padrão "light" se for undefined
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Usa o tipo User importado
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Evita renderização enquanto as fontes não estão carregadas
  }

  return (
    // Envolva sua aplicação com o ThemeProvider para permitir o uso de temas
    <ThemeProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          {/* Verifica se o usuário está autenticado antes de permitir acesso à página de signup */}
          {!user && (
            <Stack.Screen name="signup/index" options={{ headerShown: false }} />
          )}
          <Stack.Screen name="+not-found" />
        </Stack>
      </NavigationContainer>
    </ThemeProvider>
  );
}
