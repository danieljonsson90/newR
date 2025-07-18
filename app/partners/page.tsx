import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: partners } = await supabase.from('Partners').select();
  console.log(partners);

  return (
    <>
      <pre>{JSON.stringify(partners, null, 2)}</pre>
    </>
  );
}
