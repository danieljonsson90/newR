'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { updateConsultant } from '@/app/core/commands/consultants-commands';
import { getConsultantById } from '@/app/core/queries/consultant-queries';
import { Consultant } from '@/app/core/types/types';

export function UpdateConsultant({ id }: { id: number }) {
  const router = useRouter();
  const [consultant, setConsultant] = useState<Consultant>();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const update = async () => {
    setLoading(true);
    if (consultant) {
      const { data, error } = await updateConsultant(id, consultant);
      if (error) {
        setLoading(false);
        console.error('Error adding consultant:', error);
        setError(error.message);
      } else {
        console.log('Consultant added:', data);
        router.push('/consultants'); // Redirect to the consultants page
      }
    }
  };

  useEffect(() => {
    const fetchConsultant = async () => {
      const { data, error } = await getConsultantById(id);
      if (error) {
        console.error('Error fetching consultant:', error);
      } else {
        setConsultant(data);
      }
      setLoading(false);
    };
    fetchConsultant();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Link href="/consultants">Back</Link>
      <h1>Update Consultant</h1>
      <p>Fill in the form below to update the consultant .</p>
      <br />
      <form onSubmit={update}>
        <Input
          placeholder="Name"
          type="text"
          value={consultant?.name || ''}
          onChange={(e) =>
            consultant &&
            setConsultant({
              ...consultant,
              name: e.target.value,
            })
          }
          required
        />
        <Input
          placeholder="phone"
          type="text"
          value={consultant?.phone}
          onChange={(e) =>
            consultant &&
            setConsultant({
              ...consultant,
              phone: e.target.value,
            })
          }
          required
        />
        <Input
          placeholder="Email"
          type="text"
          value={consultant?.email || ''}
          onChange={(e) =>
            consultant &&
            setConsultant({
              ...consultant,
              email: e.target.value,
            })
          }
          required
        />
        <Button type="submit">Update Consultant</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
}
