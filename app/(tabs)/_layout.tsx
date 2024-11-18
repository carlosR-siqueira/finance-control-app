import { Tabs } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/Header';
import { StyleSheet, View } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
  <>
    
    <Header  userImage="https://example.com/user-photo.jpg" />
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0, // Mantém um visual mais limpo
          elevation: 5, // Adiciona um pouco de sombra para destacar a tab bar
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"home"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
        title: 'Lista de Transações',
        tabBarIcon: ({ color }) => (
        <TabBarIcon name={'swap-vertical'} color={color} />
        ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
        title: 'Perfil',
        tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name={'account'} size={30} color={color} />
        ),
        }}
      />
       <Tabs.Screen
        name="transactionDetails"
        options={{
          href: null
        }}
      />
          
          
    </Tabs>
  </>
  );
}

const styles = StyleSheet.create({
 
  

});
