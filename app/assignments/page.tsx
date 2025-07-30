'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsultantsAssignments } from '../core/queries/consult-assignment-queries';
import { ConsultantAssignment } from '../core/types/types';
import { deleteConsultantAssignment } from '../core/commands/consult-assignment-commands';
import Modal from '@/components/modal';
import { CustomTable } from '@/components/custom-table';
export default function Page() {
  const [assignments, setAssignments] = useState<ConsultantAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<ConsultantAssignment | null>();

  const columns = [
    'Consultant name',
    'Client',
    'Partner',
    'Hourly rate consultant',
    'Hourly rate client',
    'Hours worked',
    'Month',
    'Total revenue',
    'Profit',
    'Margin',
  ];
  useEffect(() => {
    const fetchConsultants = async () => {
      const { data: assignments, error } = await getConsultantsAssignments();
      if (error) {
        console.error('Error fetching assignments:', error);
      } else {
        setAssignments(assignments);
      }
      setLoading(false);
    };
    fetchConsultants();
  }, []);

  const openModal = (rowIndex: number) => {
    setIsModalOpen(true);
    setSelectedAssignment(assignments[rowIndex]);
  };
  const rows = assignments.map((assignment) => {
    return {
      id: assignment.assignment_id,
      values: [
        assignment.consultant?.name,
        assignment.client?.name,
        assignment.partner?.name,
        assignment.cost_fulltime,
        assignment.hourly_rate,
        assignment.hours_worked,
        assignment.month,
        assignment.total_revenue,
        assignment.profit,
        assignment.margin_percent + ' %',
      ],
    };
  });

  const deleteA = async () => {
    if (selectedAssignment == null) return;
    const { data, error } = await deleteConsultantAssignment(
      selectedAssignment?.assignment_id
    );
    if (error) {
      console.error('Error deleting assigment:', error);
    } else {
      setAssignments(
        assignments.filter(
          (assignment) =>
            assignment.assignment_id !== selectedAssignment.assignment_id
        )
      );
      setIsModalOpen(false);
      console.log('Assigment deleted:', data);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <CustomTable
        columns={columns}
        rows={rows}
        type="assignments"
        openModal={openModal}
      />

      <Link href="/assignments/create">Create assignment</Link>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onDelete={deleteA}
        title="Delete assigment"
      >
        <p>Are you sure you want to delete the assigment?</p>
      </Modal>
    </>
  );
}
