import * as React from 'react';
import { Avatar } from 'react-native-paper';

type UserAvatarProps = {
  userImage?: string | null; // Caminho da imagem do usuário ou nulo
};

const UserAvatar: React.FC<UserAvatarProps> = ({ userImage }) => (
  userImage ? (
    <Avatar.Image 
      size={40} 
      style={{ backgroundColor: '#4CAF50' }} 
      source={{ uri: userImage }} 
    />
  ) : (
    <Avatar.Icon 
      size={40} 
      style={{ backgroundColor: '#f8f8f8', borderColor:'#4CAF50', borderWidth: 2,   }} 
      icon="account" // Ícone de avatar padrão
    />
  )
);

export default UserAvatar;
