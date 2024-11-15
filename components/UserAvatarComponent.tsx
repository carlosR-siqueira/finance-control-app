import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { UserProfileImageApi } from '../api/database/getUserData';
import { useEffect, useState } from 'react';

type UserAvatarProps = {
  // O profileImageUrl agora será opcional, pois a URL será carregada dinamicamente
  profileImageUrl?: string | null;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ profileImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(profileImageUrl || null);

  useEffect(() => {
    // Se não houver a URL fornecida via props, tentamos buscar no Firebase
    if (!profileImageUrl) {
      const unsubscribe = UserProfileImageApi((fetchedImageUrl) => {
        setImageUrl(fetchedImageUrl);
      });

      return () => {
        unsubscribe(); // Limpa a inscrição quando o componente for desmontado
      };
    }
  }, [profileImageUrl]);

  return imageUrl ? (
    <Avatar.Image 
      size={40} 
      style={{ backgroundColor: '#4CAF50' }} 
      source={{ uri: imageUrl }} 
    />
  ) : (
    <Avatar.Icon 
      size={40} 
      style={{ backgroundColor: '#f8f8f8', borderColor:'#4CAF50', borderWidth: 2 }} 
      icon="account" // Ícone de avatar padrão
    />
  );
};

export default UserAvatar;
