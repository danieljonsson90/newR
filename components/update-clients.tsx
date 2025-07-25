'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getClientById } from '@/app/core/queries/client-queries';
import { updateClient } from '@/app/core/commands/client-commands';

export function UpdateClient({ id }: { id: number }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getClient = async (id: number) => {
    const { data, error } = await getClientById(id);

    if (error) {
      console.error('Error fetching client:', error);
    } else {
      setName(data.name);
    }
  };

  useEffect(() => {
    getClient(id);
  }, [id]);

  const update = async () => {
    if (!name) {
      setError('Client name is required');
      return;
    }
    const { data, error } = await updateClient(id, name);
    if (error) {
      console.error('Error updating client:', error);
    } else {
      console.log('Client updated:', data);
      setName(''); // Clear the input field after update
      router.push('/customers'); // Redirect to the customers page
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <h1>Update Client</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p>Update the client's information below.</p>
      <form onSubmit={update}>
        <Input
          placeholder="Client Name"
          name="update"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          type="text"
          value={name}
          onChange={onInput}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          type="submit"
          disabled={!name}
        >
          Update Client
        </Button>
      </form>
    </>
  );
}
