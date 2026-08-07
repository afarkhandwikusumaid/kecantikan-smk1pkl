import { supabase } from './src/lib/supabase.ts';

async function test() {
  console.log("Supabase URL (process.env):", process.env.VITE_SUPABASE_URL);
  const { data, error } = await supabase.from('site_settings').select('key').limit(1);
  console.log("Data:", data, "Error:", error);
}

test();
