import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const getConsultantsAssignments = async () => {
  return await supabase.from('ConsultantAssignments').select(
    `
    *,
    consultant:consultant_id (*),
    client:client_id (*),
    partner:partner_id (*)
  `
  );
};

export const getConsultantAssignmentById = async (id: number) => {
  return await supabase
    .from('ConsultantAssignments')
    .select(
      `
    *,
    consultant:consultant_id (*),
    client:client_id (*),
    partner:partner_id (*)
  `
    )
    .eq('assignment_id', id)
    .single();
};
