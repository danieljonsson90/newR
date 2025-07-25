import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

export const updatePartner = async (id: number, name: string) => {
  const { data, error } = await supabase
    .from('Partners')
    .update({ name: name })
    .eq('partner_id', id);

  return { data, error };
};

export const createNewPartner = async (name: string) => {
  const { data, error } = await supabase
    .from('Partners')
    .insert([{ name: name }])
    .single();

  return { data, error };
};

export const deletePartner = async (id: number) => {
  const { data, error } = await supabase
    .from('Partners')
    .delete()
    .eq('partner_id', id);

  return { data, error };
};
