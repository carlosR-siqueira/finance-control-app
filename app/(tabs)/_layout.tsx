import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/Header';
import { StyleSheet, View } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
  <>
    <View style={styles.header}>
    <Header  userImage="https://example.com/user-photo.jpg" />
    </View>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'logo-usd'} color={color} />
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
  header: {
     marginTop: 50,
  },
  

});
