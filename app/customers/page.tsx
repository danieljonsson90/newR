import Test from '@/components/test';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from('Clients').select();
  console.log(clients);

  return (
    <>
      <Test />
      <pre>{JSON.stringify(clients, null, 2)}</pre>
    </>
  );
}
