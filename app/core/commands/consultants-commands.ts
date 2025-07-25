import { createClient } from '@/lib/supabase/client';
import { Consultant } from '../types/types';
const supabase = createClient();

export const updateConsultant = async (id: number, consultant: Consultant) => {
  const { data, error } = await supabase
    .from('Consultants')
    .update(consultant)
    .eq('consultant_id', id);

  return { data, error };
};

export const deleteConsultant = async (id: number) => {
  const { data, error } = await supabase
    .from('Consultants')
    .delete()
    .eq('consultant_id', id);

  return { data, error };
};

export const createNewConsultant = async (consultant: {
  name: string;
  phone: string;
  email: string;
}) => {
  const { data, error } = await supabase
    .from('Consultants')
    .insert([consultant])
    .single();

  return { data, error };
};
