import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import UserAvatar from '../components/UserAvatarComponent';
import { UserNameApi } from '../api/database/getUserData';
import { Link } from 'expo-router';

type HeaderProps = {
  userImage: string;
};

const Header: React.FC<HeaderProps> = ({ userImage }) => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = UserNameApi((fetchedName) => {
      setName(fetchedName);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/icon.png')} // Substitua pelo caminho do seu logo
          style={styles.logo}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.appName}>Finance Control</Text>
      </View>
      <Link href={'/(tabs)/profile'}>
      <View style={styles.avatarContainer}>
        <UserAvatar />
        <Text style={styles.userName}>
          {name ? ` ${name}` : 'Carregando...'}
        </Text>
      </View>
      </Link>
    </View>
  );
};
 
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#135e96', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Elevação para efeito de sombra no Android
   
  },
  imgContainer:{

    justifyContent: 'center',
 

  },
  logo: {
    width: 40,
    height: 40, // Customize o tamanho do logo
  },

  titleContainer:{
    flex: 3,
    alignItems: 'baseline'
   
  },
  appName: {
 
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff', 
    // textAlign: 'center',
    
  },

  avatarContainer:{
    flex: 1,
   alignItems:'center',
   gap: 5,
  flexDirection: 'row-reverse',
    
  }, 

  userName:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left'
  }
});

export default Header;
