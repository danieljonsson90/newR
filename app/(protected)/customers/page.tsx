'use client';
import { useEffect, useState } from 'react';
import { getClients } from '../../core/queries/client-queries';

import Link from 'next/link';
import { deleteClient } from '../../core/commands/client-commands';
import { Client } from '../../core/types/types';
import Modal from '@/components/modal';
import { CustomTable } from '@/components/custom-table';
export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClients();
      setClients(clients);
      setLoading(false);
    };
    fetchClients();
  }, []);

  const rows = clients?.map((client) => {
    return {
      id: client.client_id,
      values: [client.name],
    };
  });

  const openModal = (rowIndex: number) => {
    setIsModalOpen(true);
    setSelectedClient(clients[rowIndex]);
  };
  const deleteC = async () => {
    setIsModalOpen(false);
    if (selectedClient === null) return;
    const id = selectedClient.client_id;
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
      <CustomTable
        columns={['Clients']}
        rows={rows}
        type="customers"
        openModal={openModal}
      />

      <Link href="/customers/create">Create Client</Link>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onDelete={deleteC}
        title="Delete client"
      >
        <p>Are you sure you want to delete {selectedClient?.name}?</p>
      </Modal>
    </>
  );
}
