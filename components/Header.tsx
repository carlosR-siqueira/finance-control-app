import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type HeaderProps = {
  userImage: string;
};

const Header: React.FC<HeaderProps> = ({  userImage }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/images/icon.png')} // Substitua pelo caminho do seu logo
        style={styles.logo}
      />
      <Text style={styles.appName}>Finance Control App</Text>
      <View style={styles.userContainer}>
        
        <Image
          source={{ uri: userImage }}
          style={styles.userImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#22ad13', // Customize com sua cor de fundo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Elevação para efeito de sombra no Android
   
  },
  logo: {
    width: 50,
    height: 50, // Customize o tamanho do logo
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Customize a cor do nome do app
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    marginRight: 10,
    color: '#333', // Customize a cor do nome do usuário
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
