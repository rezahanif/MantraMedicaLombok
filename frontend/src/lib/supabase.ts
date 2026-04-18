import { createBrowserClient } from '@supabase/ssr';

let _supabase: any = null;

export function getSupabase() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('[Supabase] Initializing with URL:', url?.substring(0, 20) + '...');
    
    if (url && key) {
      _supabase = createBrowserClient(url, key);
    } else {
      console.error('[Supabase] Missing env vars:', { url: !!url, key: !!key });
    }
  }

  return _supabase;
}

// Lazy proxy untuk backward compatibility
export const supabase = new Proxy({} as any, {
  get(_, prop) {
    const client = getSupabase();
    if (!client) {
      throw new Error('Supabase client not available in this context');
    }
    return Reflect.get(client, prop);
  },
});
