import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { UserNameApi, UserEmailApi } from '../api/database/getUserData';
import { logoutUser } from '@/api/auth/authContext';


const UserInfo = () => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeName = UserNameApi((fetchedName) => {
      setName(fetchedName);
    });

    const unsubscribeEmail = UserEmailApi((fetchedEmail) => {
      setEmail(fetchedEmail);
    });

    return () => {
      unsubscribeName();
      unsubscribeEmail();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
     
    } catch (error) {
      console.error('Erro ao tentar sair:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Card para o Nome */}
      <Card style={styles.card}>
        <Card.Title
          title='nome'
          subtitle={name || 'Nome não disponível'}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
          left={(props) => (
            <Avatar.Icon {...props} color={'#f8f8f8'} style={styles.cardIcon} icon="account" />
          )}
        />
      </Card>

      {/* Card para o Email */}
      <Card style={styles.card}>
        <Card.Title
          subtitle={email || 'Email não disponível'}
          title="Email"
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
          left={(props) => (
            <Avatar.Icon {...props} color={'#f8f8f8'} style={styles.cardIcon} icon="email" />
          )}
        />
      </Card>
      <View style={styles.btnContainer}>

        <Button icon="account-edit" contentStyle={{flexDirection: 'row-reverse'}} textColor='#fff' style={styles.btn} mode="elevated" onPress={() => console.log('Pressed')}>
         Editar Perfil
        </Button>
        <Button icon="logout-variant" contentStyle={{flexDirection: 'row-reverse'}}  textColor='#fff' style={styles.btn} mode="elevated" onPress={handleLogout}>
        Sair
        </Button>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 5,
  },
  card: {
    backgroundColor: '#fff',
  },
  cardIcon: {
    backgroundColor: '#135e96',
    color: '#fff',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: -7,
   

  },
  title: {
    fontSize: 16,
    color: '#888',
   

  },
  btnContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  btn:{
    backgroundColor: '#135e96',
    width: 150
  },

});

export default UserInfo;
