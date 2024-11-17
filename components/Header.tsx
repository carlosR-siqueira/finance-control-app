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
      if (fetchedName) {
      const name = fetchedName.split(' ') 
      const twoNames = name.length > 1 ? `${name[0] } ${name[1]}` : null;
      setName(twoNames);
      } else{
        setName(null)
      }
    });



    return unsubscribe;
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/icon.png')} 
          style={styles.logo}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.appName}>Finance Control</Text>
      </View>
      <Link href={'/(tabs)/profile'}>
      <View style={styles.avatarContainer}>
       
        <View>
        <Text style={styles.welcome}>
          Seja Bem-Vindo!
        </Text>
        <Text style={styles.userName}>
          {name ? ` ${name}` : 'Carregando...'}
        </Text>
        </View>
        <View style={styles.userImgContainer}>
        <UserAvatar />

        </View>
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
    elevation: 2, 
   
  },
  imgContainer:{
    marginLeft: -10
  },
  
  logo: {
    width: 40,
    height: 40, 
    
  },

  titleContainer:{
    flex: 1,
    alignItems: 'baseline'
   
  },
  appName: {
 
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff', 
    
    
  },

  avatarContainer:{
  
   alignItems:'center',
   gap: 5,
   flexDirection: 'row',
  
  }, 

  welcome:{
    color: '#fff',
    opacity: 0.7,
    
  },

  userName:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'right'
   
  },
  userImgContainer:{
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4CAF50',
   
  }
});

export default Header;
