'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsultants } from '../core/queries/consultant-queries';
import { deleteConsultant } from '../core/commands/consultants-commands';
import { Consultant } from '../core/types/types';
export default function Page() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      const consultants = await getConsultants();
      setConsultants(consultants);
      setLoading(false);
    };
    fetchConsultants();
  }, []);

  const deleteC = async (id: number) => {
    const { data, error } = await deleteConsultant(id);
    if (error) {
      console.error('Error deleting consultant:', error);
    } else {
      setConsultants(
        consultants.filter((consultant) => consultant.consultant_id !== id)
      );

      console.log('Consultant deleted:', data);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {consultants?.map((consultant) => (
            <tr key={consultant.consultant_id}>
              <td>{consultant.name}</td>
              <td>{consultant.phone}</td>
              <td>{consultant.email}</td>
              <td>
                <Link href={`/consultants/update/${consultant.consultant_id}`}>
                  Update
                </Link>
              </td>
              <td>
                <Button onClick={() => deleteC(consultant.consultant_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/consultants/create">Create Consultant</Link>
    </>
  );
}
