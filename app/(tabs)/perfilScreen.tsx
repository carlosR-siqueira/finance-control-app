import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProfileView from '../../components/PerfilScreenComponent'; // Ajuste o caminho conforme sua estrutura de pastas

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF', // Altere a cor de fundo conforme desejado
  },
});

export default ProfileScreen;
