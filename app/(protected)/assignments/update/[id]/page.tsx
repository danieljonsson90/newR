import { UpdateConsultantAssignment } from '@/components/update-consult-assignment';

export default async function UpdateConsultantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <UpdateConsultantAssignment id={parseInt(id)} />
    </>
  );
}
