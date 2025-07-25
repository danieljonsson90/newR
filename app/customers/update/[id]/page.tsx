import { UpdateClient } from '@/components/update-clients';
import Link from 'next/link';

export default async function UpdateClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('Client ID:', id);

  return (
    <>
      <Link href="/customers">Back</Link>
      <UpdateClient id={parseInt(id)} />
    </>
  );
}
