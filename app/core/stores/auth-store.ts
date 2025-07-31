// stores/authStore.ts
import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: { id: string | undefined; email: string | undefined } | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};
const supabase = createClient();
const origin = typeof window !== 'undefined' ? window.location.origin : null;
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isLoading: false,
      login: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'azure',
          options: {
            scopes: 'email',
            redirectTo: `${origin}/auth/callback`,
          },
        });
        if (error) throw error;
        if (data) {
          const { data, error } = await supabase.auth.getUser();
          if (error) throw error;
          if (data)
            set({ user: { id: data.user?.id, email: data.user?.email } });
          set({ isLoading: false });
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },

      checkAuth: async () => {
        const res = await fetch('/api/auth/me');
        if (res.ok) set({ user: await res.json() });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isLoading: false,
        login: async () => {},
        logout: async () => {},
        checkAuth: async () => {},
      }),
    }
  )
);
