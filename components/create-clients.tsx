'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { createNewClient } from '@/app/core/commands/client-commands';
export function CreateCustomers() {
  const router = useRouter();
  const [clientName, setClientName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createCustomer = async () => {
    setLoading(true);
    const { data, error } = await createNewClient(clientName);
    // Call the onCreate callback with the new client data
    if (error) {
      console.error('Error adding client:', error);
      setError(error.message);
    } else {
      setClientName(''); // Clear the input field after creation
      console.log('Client added:', data);
      router.push('/customers'); // Redirect to the customers page
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Link href="/customers">Back</Link>
      <form onSubmit={createCustomer}>
        <Input
          placeholder="Customer Name"
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
        <Button type="submit">Create Client</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
}
