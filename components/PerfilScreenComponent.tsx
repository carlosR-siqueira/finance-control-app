import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToSupabase } from '../api/storage/imgUpload'; 
import Balance from './PerfilBalance';
import { UserNameApi } from '../api/database/getUserData';


const ProfileView = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // Para armazenar a URL da imagem
  const [loading, setLoading] = useState<boolean>(false); // Para indicar que o upload está em andamento
  const [transactions, setTransactions] = useState([
    { description: 'Venda', value: 100, type: 'income' },
    { description: 'Compra', value: 50, type: 'outcome' },
  ]);

  // Função para calcular o saldo total (entrada - saída)
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

  const handleImageUpload = async () => {
    // Solicitar permissão para acessar a galeria de imagens
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar a galeria.');
      return;
    }

    // Permitir que o usuário escolha uma imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrigido para 'mediaTypes'
    });

    // Verificar se a seleção não foi cancelada
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri; // Acessar o URI da imagem

      setLoading(true); // Ativar o carregamento enquanto faz o upload
      try {
        // Realizar o upload da imagem para o Supabase
        const file = await fetch(uri); // Obter a imagem como arquivo
        const blob = await file.blob(); // Converter para blob
        const publicUrl = await uploadImageToSupabase(blob, 'user123'); // Exemplo de userId

        if (publicUrl) {
          setProfileImage(publicUrl); // Atualiza a imagem no estado com a URL pública
        }
      } catch (error) {
        console.error('Erro no upload:', error);
      } finally {
        setLoading(false); // Desativa o carregamento
      }
    }
  };

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = UserNameApi((fetchedName) => {
      setName(fetchedName);
    });

    return unsubscribe;
  }, []);

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
        <Balance transactions={transactions} calculateTotal={calculateTotal} />
        
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
  },
});

export default ProfileView;
