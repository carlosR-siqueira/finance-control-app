import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToSupabase } from '../api/storage/imgUpload'; 
import Balance from './PerfilBalance'; // Certifique-se de que o caminho está correto
import { UserNameApi } from '../api/database/getUserData';
import { auth } from '@/lib/firebaseConfig'; // Assumindo que você usa Firebase para autenticação
import { subscribeToTransactions, Transaction } from '../api/database/getData';

const ProfileView = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Adicionando estado para transações
  const [name, setName] = useState<string | null>(null);

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
          const file = await fetch(uri);
          const blob = await file.blob();
          
          const publicUrl = await uploadImageToSupabase(blob, userId);

          if (publicUrl) {
            setProfileImage(publicUrl);
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

  useEffect(() => {
    // Inscrição para buscar e atualizar o nome do usuário
    const unsubscribeUserName = UserNameApi((fetchedName) => {
      setName(fetchedName);
    });

    // Inscrição para buscar e atualizar as transações do usuário
    const unsubscribeTransactions = subscribeToTransactions((fetchedTransactions: React.SetStateAction<Transaction[]>) => {
      setTransactions(fetchedTransactions);
    });

    return () => {
      unsubscribeUserName();
      unsubscribeTransactions();
    };
  }, []);

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
    backgroundColor: '#4CAF50',
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
});

export default ProfileView;
