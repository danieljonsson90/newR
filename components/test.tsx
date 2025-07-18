'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Test() {
  type Client = {
    client_id: number;
    name: string;
  };
  const [newName, setNewName] = useState('');
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from('Clients').select('*');

    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      console.log('Clients fetched:', data);
      setClients(data);
      console.log('Clients:', clients);
    }
  };

  const addClient = async () => {
    const supabase = await createClient();
    const clientName = 'adlibris';
    const { data, error } = await supabase
      .from('Clients')
      .insert([{ name: clientName }])
      .single();

    if (error) {
      console.error('Error adding client:', error);
    } else {
      console.log('Client added:', data);
    }
  };

  const updateClient = async (id: number, newName: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('Clients')
      .update({ name: newName })
      .eq('client_id', id);

    if (error) {
      console.error('Error updating client:', error);
    } else {
      console.log('Client updated:', data);
      setNewName(''); // Clear the input field after update
    }
  };

  const deleteClient = async (id: number) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('Clients')
      .delete()
      .eq('client_id', id);

    if (error) {
      console.error('Error deleting client:', error);
    } else {
      console.log('Client deleted:', data);
    }
  };

  return (
    <>
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        onClick={addClient}
      >
        Add Client
      </button>
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        onClick={fetchClients}
      >
        Fetch Clients
      </button>
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        onClick={() => updateClient(clients[0]?.client_id, newName)}
      >
        Update Client
      </button>
      <input
        name="update"
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        type="text"
        placeholder="Update Client"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        onClick={() => deleteClient(clients[0]?.client_id)}
      >
        Delete Client
      </button>
    </>
  );
}
