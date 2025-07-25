import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const getConsultants = async () => {
  const { data: consultants, error } = await supabase
    .from('Consultants')
    .select();

  if (error) {
    console.error('Error fetching consultants:', error);
    return [];
  }

  return consultants;
};

export const getConsultantById = async (id: number) => {
  return await supabase
    .from('Consultants')
    .select()
    .eq('consultant_id', id)
    .single();
};
