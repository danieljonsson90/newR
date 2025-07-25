'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { createNewPartner } from '@/app/core/commands/partner-commands';

export default function CreatePartners() {
  const router = useRouter();
  const [partnerName, setPartnerName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createPartner = async () => {
    if (!partnerName) {
      setError('Partner name is required');
      return;
    }

    setLoading(true);
    const { data, error } = await createNewPartner(partnerName);
    if (error) {
      console.error('Error adding partner:', error);
    } else {
      setPartnerName(''); // Clear the input field after creation
      console.log('Partner added:', data);
      router.push('/partners'); // Redirect to the partners page
    }
  };
  if (loading) return <div>Laddar...</div>;

  return (
    <>
      <form onSubmit={createPartner}>
        <h1>Create Partner</h1>
        <br />
        <Link href="/partners">Back</Link>
        <Input
          placeholder="Partner Name"
          type="text"
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
          required
        />
        <Button type="submit">Create Partner</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
}
