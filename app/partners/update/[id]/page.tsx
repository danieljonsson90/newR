import { UpdatePartner } from '@/components/update-partners';
import Link from 'next/link';

export default async function UpdatePartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('Partner ID:', id);

  return (
    <>
      <Link href="/partners">Back</Link>
      <UpdatePartner id={parseInt(id)} />
    </>
  );
}
