import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase Environment Variables');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

/**
 * Uploads a file to the 'asset-saya' bucket and returns its public URL.
 * File can be grouped into folders (e.g. 'guru', 'layanan', 'dokumentasi').
 */
export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  
  // Clean folder name to ensure no leading/trailing slashes
  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
  const filePath = `${cleanFolder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('asset-saya')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('asset-saya')
    .getPublicUrl(filePath);

  return publicUrl;
}
