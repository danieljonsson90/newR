'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/core/stores/auth-store';

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const logoutHandler = async () => {
    logout();
    // const supabase = createClient();
    // await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return <Button onClick={logoutHandler}>Logout</Button>;
}
