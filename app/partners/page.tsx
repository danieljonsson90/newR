'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPartners } from '../core/queries/partner-queries';
import { deletePartner } from '../core/commands/partner-commands';
import { Partner } from '../core/types/types';
import Modal from '@/components/modal';
import { CustomTable } from '@/components/custom-table';

export default function Page() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partner, setSelectedPartner] = useState<Partner | null>();

  useEffect(() => {
    const fetchPartners = async () => {
      const partners = await getPartners();
      setPartners(partners);
      setLoading(false);
    };
    fetchPartners();
  }, []);

  const rows = partners?.map((partner) => {
    return {
      id: partner.partner_id,
      values: [partner.name],
    };
  });

  const openModal = (rowIndex: number) => {
    setIsModalOpen(true);
    setSelectedPartner(partners[rowIndex]);
  };

  const deleteP = async () => {
    if (partner == null) return;
    const { data, error } = await deletePartner(partner.partner_id);

    if (error) {
      console.error('Error deleting partner:', error);
    } else {
      console.log('Partner deleted:', data);
      setPartners(partners.filter((p) => p.partner_id !== partner.partner_id));
      setIsModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <CustomTable
        columns={['Partners']}
        rows={rows}
        type="partners"
        openModal={openModal}
      />

      <Link href="/partners/create">Create Partner</Link>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onDelete={deleteP}
        title="Delete partner"
      >
        <p>Are you sure you want to delete {partner?.name}?</p>
      </Modal>
    </>
  );
}
