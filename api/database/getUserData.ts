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
