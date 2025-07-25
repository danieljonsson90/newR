'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { createNewConsultant } from '@/app/core/commands/consultants-commands';

export function CreateConsultant() {
  const router = useRouter();
  const [consultantName, setConsultantName] = useState('');
  const [consultantPhone, setConsultantPhone] = useState('');
  const [consultantEmail, setConsultantEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const create = async () => {
    setLoading(true);
    const { data, error } = await createNewConsultant({
      name: consultantName,
      phone: consultantPhone,
      email: consultantEmail,
    });
    if (error) {
      setLoading(false);
      console.error('Error adding consultant:', error);
      setError(error.message);
    } else {
      console.log('Consultant added:', data);
      router.push('/consultants');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Link href="/consultants">Back</Link>
      <h1>Create Consultant</h1>
      <p>Fill in the form below to create a new consultant.</p>
      <br />
      <form onSubmit={create}>
        <Input
          placeholder="Consultant Name"
          type="text"
          value={consultantName}
          onChange={(e) => setConsultantName(e.target.value)}
          required
        />
        <Input
          placeholder="Phone Number"
          type="text"
          value={consultantPhone}
          onChange={(e) => setConsultantPhone(e.target.value)}
          required
        />
        <Input
          placeholder="Email Address"
          type="text"
          value={consultantEmail}
          onChange={(e) => setConsultantEmail(e.target.value)}
          required
        />
        <Button type="submit">Create Consultant</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
}
