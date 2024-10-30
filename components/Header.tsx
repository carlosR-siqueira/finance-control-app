import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

type HeaderProps = {
  userImage: string;
};

const Header: React.FC<HeaderProps> = ({  userImage }) => {
  return (
    <View style={styles.headerContainer}>
      <View  style={styles.imgContainer}>

      <Image
        source={require('../assets/images/icon.png')} // Substitua pelo caminho do seu logo
        style={styles.logo}
        />
        </View>
        <View  style={styles.titleContainer}>

         <Text style={styles.appName}>Finance Control App</Text>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#135e96', // Customize com sua cor de fundo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Elevação para efeito de sombra no Android
   
  },
  imgContainer:{
    flex:  1,
    justifyContent: 'center',
    marginLeft:  10,

  },
  logo: {
    width: 50,
    height: 50, // Customize o tamanho do logo
  },

  titleContainer:{
    flex: 2.5,
   
  },
  appName: {
 
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Customize a cor do nome do app
    // textAlign: 'center',
  },
 
  
});

export default Header;
