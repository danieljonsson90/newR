import { UpdateConsultant } from '@/components/update-consultant';

export default async function UpdateConsultantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <UpdateConsultant id={parseInt(id)} />
    </>
  );
}
