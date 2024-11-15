import * as FileSystem from 'expo-file-system';
import { supabase } from '../../lib/supabaseClient';

export const uploadImageToSupabase = async (fileUri: string, userId: string): Promise<string | null> => {
  const fileName = `${userId}-${Date.now()}.jpg`; // Nome único

  try {
    // Lê o arquivo como binário
    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Converte Base64 para binário explícito
    const binary = atob(fileContent);

    // Cria um Uint8Array do binário
    const byteArray = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i);
    }

    // Realiza o upload para o Supabase
    const { data, error } = await supabase.storage
      .from('finance')
      .upload(fileName, byteArray, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error('Erro ao fazer upload:', error.message);
      return null;
    }

    // Obtém URL pública da imagem
    const { data: urlData } = supabase.storage
      .from('finance')
      .getPublicUrl(fileName);

    return urlData?.publicUrl ?? null;
  } catch (error) {
    console.error('Erro ao processar o upload:', error);
    return null;
  }
};
