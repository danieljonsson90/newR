'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPartners } from '../core/queries/partner-queries';
import { deletePartner } from '../core/commands/partner-commands';
import { Partner } from '../core/types/types';

export default function Page() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPartners = async () => {
      const partners = await getPartners();
      setPartners(partners);
      setLoading(false);
    };
    fetchPartners();
  }, []);

  const deleteP = async (id: number) => {
    const { data, error } = await deletePartner(id);
    if (!error) {
      setPartners(partners.filter((partner) => partner.partner_id !== id));
    }
    if (error) {
      console.error('Error deleting partner:', error);
    } else {
      console.log('Partner deleted:', data);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Partners</th>
          </tr>
        </thead>
        <tbody>
          {partners?.map((partner) => (
            <tr key={partner.partner_id}>
              <td>{partner.name}</td>
              <td>
                <Link href={`/partners/update/${partner.partner_id}`}>
                  Update
                </Link>
              </td>
              <td>
                <Button onClick={() => deleteP(partner.partner_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/partners/create">Create Partner</Link>
    </>
  );
}
