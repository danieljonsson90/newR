'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsultants } from '../../core/queries/consultant-queries';
import { deleteConsultant } from '../../core/commands/consultants-commands';
import { Consultant } from '../../core/types/types';
import Modal from '@/components/modal';
import { CustomTable } from '@/components/custom-table';
export default function Page() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] =
    useState<Consultant | null>();
  useEffect(() => {
    const fetchConsultants = async () => {
      const consultants = await getConsultants();
      setConsultants(consultants);
      setLoading(false);
    };
    fetchConsultants();
  }, []);
  const columns = ['Name', 'Phone number', 'Email'];
  const rows = consultants?.map((consultant) => {
    return {
      id: consultant.consultant_id,
      values: [consultant.name, consultant.phone, consultant.email],
    };
  });
  const openModal = (rowIndex: number) => {
    setIsModalOpen(true);
    setSelectedConsultant(consultants[rowIndex]);
  };

  const deleteC = async () => {
    if (selectedConsultant == null) return;
    const { data, error } = await deleteConsultant(
      selectedConsultant?.consultant_id
    );
    if (error) {
      console.error('Error deleting consultant:', error);
    } else {
      setConsultants(
        consultants.filter(
          (consultant) =>
            consultant.consultant_id !== selectedConsultant.consultant_id
        )
      );
      setIsModalOpen(false);
      console.log('Consultant deleted:', data);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <CustomTable
        columns={columns}
        rows={rows}
        type="consultants"
        openModal={openModal}
      />

      <Link href="/consultants/create">Create Consultant</Link>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onDelete={deleteC}
        title="Delete consultant"
      >
        <p>Are you sure you want to delete {selectedConsultant?.name}?</p>
      </Modal>
    </>
  );
}
