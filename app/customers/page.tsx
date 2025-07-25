'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getClients } from '../core/queries/client-queries';

import Link from 'next/link';
import { deleteClient } from '../core/commands/client-commands';
import { Client } from '../core/types/types';
export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClients();
      setClients(clients);
      setLoading(false);
    };
    fetchClients();
  }, []);

  const deleteC = async (id: number) => {
    const { data, error } = await deleteClient(id);
    if (error) {
      console.error('Error deleting client:', error);
    } else {
      setClients(clients.filter((client) => client.client_id !== id));
      console.log('Client deleted:', data);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Clients</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client) => (
            <tr key={client.client_id}>
              <td>
                {client.name} <br />
              </td>
              <td>
                <Link href={`/customers/update/${client.client_id}`}>
                  Update
                </Link>
              </td>
              <td>
                <Button onClick={() => deleteC(client.client_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/customers/create">Create Client</Link>
    </>
  );
}
