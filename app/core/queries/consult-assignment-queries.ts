import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const getConsultantsAssignments = async () => {
  return await supabase.from('ConsultantAssignments').select(
    `
    *,
    Consultant:consultant_id (*),
    Client:client_id (*),
    Partner:partner_id (*)
  `
  );
};

export const getConsultantAssignmentById = async (id: number) => {
  return await supabase
    .from('ConsultantAssignments')
    .select(
      `
    *,
    Consultant:consultant_id (*),
    Client:client_id (*),
    Partner:partner_id (*)
  `
    )
    .eq('assignment_id', id)
    .single();
};
