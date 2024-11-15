import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToSupabase } from '../api/storage/imgUpload'; 
import Balance from './PerfilBalance'
import { UserNameApi, UserProfileImageApi } from '../api/database/getUserData'; 
import { auth } from '@/lib/firebaseConfig'; 
import { subscribeToTransactions, Transaction } from '../api/database/getData';
import { updateUserProfileImage } from '../api/database/imgUrlToDatabase';  
import UserInfo from './UserInfoComponent'

const ProfileView = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // Armazena a URL da imagem de perfil
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Adicionando estado para transações
  const [name, setName] = useState<string | null>(null);

  // Função para buscar a imagem de perfil do Firebase
  useEffect(() => {
    // Busca a URL da imagem de perfil assim que o componente for montado
    const unsubscribeProfileImage = UserProfileImageApi((fetchedImageUrl) => {
      setProfileImage(fetchedImageUrl);
    });

    // Inscrição para buscar e atualizar o nome do usuário
    const unsubscribeUserName = UserNameApi((fetchedName) => {
      setName(fetchedName);
    });

    // Inscrição para buscar e atualizar as transações do usuário
    const unsubscribeTransactions = subscribeToTransactions((fetchedTransactions: React.SetStateAction<Transaction[]>) => {
      setTransactions(fetchedTransactions);
    });

    // Limpa as inscrições quando o componente for desmontado
    return () => {
      unsubscribeProfileImage();
      unsubscribeUserName();
      unsubscribeTransactions();
    };
  }, []);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar a galeria.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setLoading(true);
  
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          // Realiza o upload da imagem para o Supabase e pega a URL pública
          const publicUrl = await uploadImageToSupabase(uri, userId);
  
          if (publicUrl) {
            setProfileImage(publicUrl);
  
            // Atualiza a URL da imagem de perfil no Firebase Realtime Database
            await updateUserProfileImage(publicUrl);
          }
        } else {
          alert('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro no upload:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Função para calcular o saldo total
  const calculateTotal = () => {
    const totalIncome = transactions.reduce(
      (acc, transaction) => (transaction.type === 'income' ? acc + transaction.value : acc),
      0
    );
    const totalOutcome = transactions.reduce(
      (acc, transaction) => (transaction.type === 'outcome' ? acc + transaction.value : acc),
      0
    );
    return totalIncome - totalOutcome;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image style={styles.avatar} source={{ uri: profileImage }} />
            ) : (
              <View style={[styles.avatar, styles.defaultAvatar]}>
                <Icon name="person-outline" size={60} color="#fff" />
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={handleImageUpload}
              disabled={loading}
            >
              <Icon name="camera-outline" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{name ? ` ${name}` : 'Carregando...'}</Text>
        </View>
      </View>

      <View style={styles.profileDetail}>
        <Text>
          <Balance transactions={transactions} calculateTotal={calculateTotal} /> {/* Exibindo Balance com dados reais */}
        </Text>
      </View>
      <View style={styles.userInfoContainer}>
      <UserInfo  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#f9f9f9',
    height: 240,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#4CAF50',
    marginBottom: 10,
  },
  defaultAvatar: {
    backgroundColor: '#0001',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    backgroundColor: '#135e96',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 210,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 7,
    shadowRadius: 2,
    elevation: 3,
    padding: 10,
  },
  userInfoContainer:{
    marginVertical: 60,
  }
});

export default ProfileView;