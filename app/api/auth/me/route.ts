// api/auth/me/route.ts
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) return new Response(null, { status: 401 });
  return Response.json({ id: data.user.id, email: data.user.email });
}
