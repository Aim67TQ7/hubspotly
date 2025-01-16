// src/utils/subdomain.ts
export const getSubdomain = (hostname: string): string | null => {
  const parts = hostname.split('.');
  if (parts.length > 2 && parts[parts.length - 2] === 'hubspotly') {
    return parts[parts.length - 3];
  }
  return null;
};

// src/App.tsx
import { useEffect, useState } from 'react';
import { getSubdomain } from './utils/subdomain';
import { createSupabaseClient } from './lib/supabase';

const App = () => {
  const [supabase, setSupabase] = useState(null);
  const subdomain = getSubdomain(window.location.hostname);

  useEffect(() => {
    if (subdomain) {
      createSupabaseClient(subdomain).then(client => {
        setSupabase(client);
      });
    }
  }, [subdomain]);

  if (!subdomain) {
    return <MainSite />; // Component for hubspotly.com
  }

  if (!supabase) {
    return <Loading />;
  }

  return <TenantApp supabase={supabase} />;
};
