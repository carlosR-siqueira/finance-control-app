//api/database/imgUrlToDatabase.ts

import { getDatabase, ref, update } from 'firebase/database';
import { auth } from '../../lib/firebaseConfig';

export const updateUserProfileImage = async (imageUrl: string): Promise<void> => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('Usuário não autenticado.');
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    await update(userRef, {
      profileImageUrl: imageUrl,
    });

    console.log('Imagem de perfil atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar a imagem de perfil:', error);
    throw error;
  }
};
