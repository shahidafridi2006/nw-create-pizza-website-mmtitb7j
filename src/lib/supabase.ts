import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = "https://sfasknpxifudlaxhyyuj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmYXNrbnB4aWZ1ZGxheGh5eXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODQ3NjgsImV4cCI6MjA4OTI2MDc2OH0.GJ87O9bVJy--i8LWactKYCe4n5Kdx85jIzu61DXslV0";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);