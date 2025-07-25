'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsultantsAssignments } from '../core/queries/consult-assignment-queries';
import { ConsultantAssignment } from '../core/types/types';
import { deleteConsultantAssignment } from '../core/commands/consult-assignment-commands';
export default function Page() {
  const [assignments, setAssignments] = useState<ConsultantAssignment[]>([]);
  const [loading, setLoading] = useState(true);

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

  const deleteC = async (id?: number) => {
    if (!id) return;
    const { data, error } = await deleteConsultantAssignment(id);
    if (error) {
      console.error('Error deleting consultant:', error);
    } else {
      setAssignments(
        assignments.filter((assignment) => assignment.assignment_id !== id)
      );

      console.log('Consultant deleted:', data);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Consultant name</th>
            <th>Client</th>
            <th>Partner</th>
            <th>Hourly rate consultant</th>
            <th>Hourly rate client</th>
            <th>Hours worked</th>
            <th>Month</th>
            <th>Total revenue</th>
            <th>Profit</th>
            <th>Margin %</th>
          </tr>
        </thead>
        <tbody>
          {assignments?.map((assignment) => (
            <tr key={assignment.assignment_id}>
              <td>
                {assignment.Consultant?.name} <br />
              </td>
              <td>
                {assignment.Client?.name} <br />
              </td>
              <td>
                {assignment.Partner?.name} <br />
              </td>
              <td>
                {assignment.cost_fulltime} <br />
              </td>
              <td>
                {assignment.hourly_rate} <br />
              </td>
              <td>
                {assignment.hours_worked} <br />
              </td>
              <td>
                {assignment.month} <br />
              </td>
              <td>
                {assignment.total_revenue} <br />
              </td>
              <td>
                {assignment.profit} <br />
              </td>
              <td>
                {assignment.margin_percent} <br />
              </td>
              <td>
                <Link
                  href={`/assignments/update/${assignment.Consultant?.consultant_id}`}
                >
                  Update
                </Link>
              </td>
              <td>
                <Button onClick={() => deleteC(assignment.assignment_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/assignments/create">Create assignment</Link>
    </>
  );
}
