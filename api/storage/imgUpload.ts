// api/storage/imgUpload.ts
import * as FileSystem from 'expo-file-system';
import { supabase } from '../../lib/supabaseClient';

export const uploadImageToSupabase = async (fileUri: string, userId: string): Promise<string | null> => {
  const fileName = `${userId}.jpg`; // Usando o mesmo nome de arquivo para substituir o existente

  try {
    // Remove o arquivo antigo, se existir, antes de fazer o upload
    const { data: existingData, error: removeError } = await supabase.storage
      .from('finance')
      .remove([fileName]);

    if (removeError) {
      console.error('Erro ao remover o arquivo anterior:', removeError.message);
    }

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
        upsert: false, // Não usa upsert aqui para garantir que o arquivo anterior seja removido
      });

    if (error) {
      console.error('Erro ao fazer upload:', error.message);
      return null;
    }

    // Obtém a URL pública da imagem
    const { data: urlData } = supabase.storage
      .from('finance')
      .getPublicUrl(fileName);

    // Força o recarregamento da imagem com timestamp para evitar cache
    const imageUrlWithTimestamp = urlData?.publicUrl + '?t=' + Date.now();

    return imageUrlWithTimestamp ?? null;
  } catch (error) {
    console.error('Erro ao processar o upload:', error);
    return null;
  }
};
