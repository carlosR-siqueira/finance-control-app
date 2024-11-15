import { database } from '../../lib/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { auth } from '../../lib/firebaseConfig';

// Função para assinar e obter o nome do usuário
export const UserNameApi = (callback: (name: string | null) => void) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('Erro: Usuário não autenticado');
    callback(null);
    return () => {};
  }

  const uid = user.uid;
  const userRef = ref(database, `users/${uid}/name`);

  const unsubscribe = onValue(userRef, (snapshot) => {
    const name = snapshot.val();
    if (name) {
      callback(name);
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};

// Função para assinar e obter a URL da imagem de perfil do usuário
export const UserProfileImageApi = (callback: (imageUrl: string | null) => void) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('Erro: Usuário não autenticado');
    callback(null);
    return () => {};
  }

  const uid = user.uid;
  const userProfileImageRef = ref(database, `users/${uid}/profileImageUrl`);

  const unsubscribe = onValue(userProfileImageRef, (snapshot) => {
    const imageUrl = snapshot.val();
    if (imageUrl) {
      callback(imageUrl);
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};

// Função para assinar e obter o email do usuário
export const UserEmailApi = (callback: (email: string | null) => void) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('Erro: Usuário não autenticado');
    callback(null);
    return () => {};
  }

  const uid = user.uid;
  const userEmailRef = ref(database, `users/${uid}/email`);

  const unsubscribe = onValue(userEmailRef, (snapshot) => {
    const email = snapshot.val();
    if (email) {
      callback(email);
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};
