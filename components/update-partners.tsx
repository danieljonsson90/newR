'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getPartnerById } from '@/app/core/queries/partner-queries';
import { updatePartner } from '@/app/core/commands/partner-commands';

export function UpdatePartner({ id }: { id: number }) {
  const router = useRouter();
  const [name, setName] = useState('');

  const getPartner = async () => {
    const { data, error } = await getPartnerById(id);
    if (error) {
      console.error('Error fetching partner:', error);
    } else {
      setName(data.name);
    }
  };
  useEffect(() => {
    getPartner();
  }, []);

  const update = async () => {
    const { data, error } = await updatePartner(id, name);
    if (error) {
      console.error('Error updating partner:', error);
    } else {
      console.log('Partner updated:', data);
      setName(''); // Clear the input field after update
      router.push('/partners'); // Redirect to the partners page
    }
  };

  return (
    <>
      <form onSubmit={update}>
        <Input
          placeholder="Name of Partner"
          name="update"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          type="submit"
        >
          Update Partner
        </Button>
      </form>
    </>
  );
}
