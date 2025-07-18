import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: consultants } = await supabase.from('Consultants').select();
  console.log(consultants);

  return (
    <>
      <pre>{JSON.stringify(consultants, null, 2)}</pre>
    </>
  );
}
