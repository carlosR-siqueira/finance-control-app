// api/database/imgUrlToDatabase.ts
import { ref, set } from 'firebase/database';
import { auth, database } from '../../lib/firebaseConfig';  // Caminho correto para a configuração do Firebase

// Função para atualizar a URL da imagem de perfil no Firebase
export const updateUserProfileImage = async (imageUrl: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('Usuário não autenticado');
    return;
  }

  const userId = user.uid;
  const userProfileImageRef = ref(database, `users/${userId}/profileImageUrl`);

  try {
    // Atualiza a URL da imagem no Firebase
    await set(userProfileImageRef, imageUrl);
    console.log('URL da imagem de perfil atualizada no Firebase com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar URL no Firebase:', error);
  }
};
