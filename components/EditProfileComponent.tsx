import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { uploadImageToSupabase } from '@/api/storage/imgUpload'; 
import { updateUserProfileImage } from '@/api/database/imgUrlToDatabase'; 
import { auth } from '@/lib/firebaseConfig'; 
import { UserProfileImageApi, UserNameApi, UserEmailApi } from '@/api/database/getUserData';

const EditProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Buscar nome do usuário
  useEffect(() => {
    const unsubscribeName = UserNameApi((fetchedName) => {
      if (fetchedName) {
        setName(fetchedName);
      }
    });

    return () => unsubscribeName();
  }, []);

  // Buscar email do usuário
  useEffect(() => {
    const unsubscribeEmail = UserEmailApi((fetchedEmail) => {
      if (fetchedEmail) {
        setEmail(fetchedEmail);
      }
    });

    return () => unsubscribeEmail();
  }, []);

  // Buscar imagem do usuário
  useEffect(() => {
    const unsubscribeImage = UserProfileImageApi((imageUrl) => {
      if (imageUrl) {
        setProfilePicture(imageUrl);
      }
    });

    return () => unsubscribeImage();
  }, []);

  const handleSave = () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente!');
      return;
    }

    Alert.alert('Alterações salvas', `Nome: ${name}\nEmail: ${email}`);
    
    setName('');
    setEmail('');
    setPassword('');
    setProfilePicture(null);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Você tem certeza que deseja excluir sua conta?',
      [
        { text: 'Cancelar' },
        { text: 'Excluir', onPress: () => alert('Conta excluída!') }
      ]
    );
  };

  const handleChangeProfilePicture = async () => {
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
          const publicUrl = await uploadImageToSupabase(uri, userId);
          if (publicUrl) {
            setProfilePicture(publicUrl);
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

  return (
    <View style={styles.form}>
      <View style={styles.profilePictureContainer}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <Text style={styles.noProfilePictureText}>Sem foto de perfil</Text>
        )}
        <View style={styles.imgBtnContainer}>
          <Button
            icon="account-edit" 
            contentStyle={{ flexDirection: 'row-reverse' }} 
            textColor="#fff" 
            style={styles.changePictureButton} 
            mode="elevated" 
            onPress={handleChangeProfilePicture} 
            loading={loading}
          >
            Alterar Foto
          </Button>
          <Button
            icon="delete"
            contentStyle={{ flexDirection: 'row-reverse' }}
            textColor="#fff"
            style={styles.changePictureButton}
            mode="elevated"
            onPress={() => alert('Excluir foto')}
            loading={loading}
          >
            Excluir Foto
          </Button>
        </View>
      </View>
      
      <TextInput
        mode="outlined"
        style={styles.inputBox}
        value={name}
        label="Nome"
        onChangeText={setName}
        outlineColor="#ccc"
        activeOutlineColor="#135e96"
      />
      <TextInput
        mode="outlined"
        style={styles.inputBox}
        value={email}
        label="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
        outlineColor="#ccc"
        activeOutlineColor="#135e96"
      />
      <Button
        icon="key-change"
        contentStyle={{ flexDirection: 'row-reverse' }}
        textColor="#fff"
        style={styles.changePictureButton}
        mode="elevated"
        onPress={() => alert('Excluir foto')}
        loading={loading}
      >
        Redefinir Senha
      </Button>
      
      <Button
        icon={'content-save'}
        contentStyle={{ flexDirection: 'row-reverse' }}
        mode="contained"
        style={styles.saveButton}
        onPress={handleSave}
        loading={loading}
      >
        Salvar Alterações
      </Button>
      <View style={styles.btnDelContainer}>

        <Button
          mode="outlined"
          textColor='#FF7777'
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
          >
            Excluir Conta
          </Button>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  form: {
    padding: 20,
    marginBottom: 20,
  },
  inputBox: {
    marginVertical: 10,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  noProfilePictureText: {
    fontSize: 16,
    color: '#aaa',
  },
  imgBtnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  changePictureButton: {
    backgroundColor: '#135e96',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#135e96',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnDelContainer:{
    height: 100,
    justifyContent: 'flex-end'
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
   
  },
});

export default EditProfileForm;
