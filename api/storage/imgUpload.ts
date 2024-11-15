import { supabase } from '../../lib/supabaseClient';

export const uploadImageToSupabase = async (file: Blob, userId: string): Promise<string | null> => {
  const fileName = `${userId}-${Date.now()}.jpg`; // Nome único para evitar conflitos

  // Upload do arquivo para o Supabase Storage
  const { data, error } = await supabase.storage
    .from('finance')  // 
    .upload(fileName, file, { upsert: true });

  if (error) {
    console.error('Erro ao fazer upload:', error.message); // Exibe a mensagem de erro
    return null;
  }

  // Gera URL pública da imagem
  const { data: urlData } = supabase.storage
    .from('finance')
    .getPublicUrl(fileName); // O retorno é apenas 'data' agora, sem 'error'

  if (!urlData) {
    console.error('Erro ao obter URL pública'); // Se não houver dados, significa que falhou
    return null;
  }

  return urlData.publicUrl; // Retorna a URL pública
};

