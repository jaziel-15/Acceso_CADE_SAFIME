import { createClient } from '@supabase/supabase-js';

// Usamos `import.meta.env` para acceder a las variables de entorno con Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('supabaseUrl y supabaseKey son requeridos. Verifica tu archivo .env.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);


