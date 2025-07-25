import { createClient } from '@/lib/supabase/client';
import { ConsultantAssignment } from '../types/types';
const supabase = createClient();

export const updateConsultantAssignment = async (
  id: number,
  consultantAssignment: ConsultantAssignment
) => {
  consultantAssignment = {
    ...consultantAssignment,
    Consultant: undefined,
    Client: undefined,
    Partner: undefined,
  };
  const { data, error } = await supabase
    .from('ConsultantAssignments')
    .update(consultantAssignment)
    .eq('assignment_id', id);

  return { data, error };
};

export const deleteConsultantAssignment = async (id: number) => {
  const { data, error } = await supabase
    .from('ConsultantAssignments')
    .delete()
    .eq('assignment_id', id);

  return { data, error };
};

export const createNewConsultantAssignment = async (
  consultantAssignment: ConsultantAssignment
) => {
  const { data, error } = await supabase
    .from('ConsultantAssignments')
    .insert([consultantAssignment])
    .single();

  return { data, error };
};
