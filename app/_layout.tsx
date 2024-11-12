import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth'; // Importa o tipo User do firebase/auth
import { useColorScheme } from '@/hooks/useColorScheme';

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

  useEffect(() => {
    // Observa mudanças na autenticação do Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
      if (user) {
        // Se o usuário estiver autenticado, redireciona para a tela principal
        router.replace('/(tabs)');
      } else if (!user && !initializing) {
        // Se o usuário não estiver autenticado, redireciona para a tela de login
        router.replace('/login');
      }
    });

    return unsubscribe;
  }, [initializing, router]);

  if (!loaded || initializing) {
    return null; // Exibe uma tela de carregamento enquanto o Firebase verifica o status
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        {/* Verifica se o usuário está autenticado antes de permitir acesso à página de signup */}
        {!user && (
          <Stack.Screen name="signup/index" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
