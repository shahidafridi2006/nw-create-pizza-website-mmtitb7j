import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = "__SUPABASE_URL__";
const supabaseAnonKey = "__SUPABASE_ANON_KEY__";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);