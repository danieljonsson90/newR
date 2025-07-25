import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

export const getClients = async () => {
  const { data: clients, error } = await supabase.from('Clients').select();
  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }

  return clients;
};

export const getClientById = async (id: number) => {
  return await supabase.from('Clients').select().eq('client_id', id).single();
};
