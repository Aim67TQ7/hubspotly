// src/lib/types.ts
interface TenantConfig {
  tenantId: string;
  subdomain: string;
  supabaseUrl: string;
  supabaseKey: string;
  companyName: string;
  createdAt: Date;
}

// src/lib/tenant.ts
export const getTenantConfig = async (subdomain: string): Promise<TenantConfig> => {
  // In production, this would fetch from a central management database
  // For now, we'll use environment variables with tenant prefix
  const config = {
    tenantId: import.meta.env[`VITE_${subdomain.toUpperCase()}_TENANT_ID`],
    supabaseUrl: import.meta.env[`VITE_${subdomain.toUpperCase()}_SUPABASE_URL`],
    supabaseKey: import.meta.env[`VITE_${subdomain.toUpperCase()}_SUPABASE_KEY`],
    // ... other tenant-specific config
  };
  
  return config;
};
