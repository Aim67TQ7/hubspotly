// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { getTenantConfig } from './tenant';

export const createSupabaseClient = async (subdomain: string) => {
  const config = await getTenantConfig(subdomain);
  return createClient(config.supabaseUrl, config.supabaseKey);
};

// Usage in components
const supabase = await createSupabaseClient(subdomain);
