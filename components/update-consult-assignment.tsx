'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  Client,
  Consultant,
  ConsultantAssignment,
  Partner,
} from '@/app/core/types/types';
import { updateConsultantAssignment } from '@/app/core/commands/consult-assignment-commands';
import { calculateRevenueMarginAndProfit } from '@/app/utilities/helpers/helpers';
import { getConsultantAssignmentById } from '@/app/core/queries/consult-assignment-queries';
import { getConsultants } from '@/app/core/queries/consultant-queries';
import { getClients } from '@/app/core/queries/client-queries';
import { getPartners } from '@/app/core/queries/partner-queries';

export function UpdateConsultantAssignment({ id }: { id: number }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [consultAssignment, setConsultantAssignment] =
    useState<ConsultantAssignment>();

  useEffect(() => {
    const fetchData = async () => {
      const { data: assignment, error } = await getConsultantAssignmentById(id);
      if (error) {
        setError(error.message);
      } else {
        setConsultantAssignment(assignment);
      }
      const consultants = await getConsultants();
      setConsultants(consultants);
      const clients = await getClients();
      setClients(clients);
      const partners = await getPartners();
      setPartners(partners);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const months = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  const update = async () => {
    if (!consultAssignment) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    const { totalRevenue, margin, profit } =
      calculateRevenueMarginAndProfit(consultAssignment);

    setConsultantAssignment({
      ...consultAssignment,
      profit: profit,
      margin_percent: margin,
      total_revenue: totalRevenue,
    });
    setLoading(true);

    const { data, error } = await updateConsultantAssignment(
      id,
      consultAssignment as ConsultantAssignment
    );
    if (error) {
      setLoading(false);
      console.error('Error updating consultant assignment:', error);
      setError(error.message);
    } else {
      console.log('Consultant assignment updated:', data);
      router.push('/assignments'); // Redirect to the consultants page
    }
  };

  if (loading) return <div>Laddar...</div>;

  return (
    <>
      <Link href="/assignments">Back</Link>
      <h1>Consultant Assignment Information</h1>
      <p>
        Fill in the form below to update the consultant assignment information.
      </p>
      <br />
      <form onSubmit={update}>
        <div>
          <select
            name="consultant"
            id="consultant"
            onChange={(e) =>
              setConsultantAssignment(
                consultAssignment && {
                  ...consultAssignment,
                  consultant_id: +e.target.value,
                }
              )
            }
            value={consultAssignment?.consultant_id || ''}
            required
          >
            {consultants.map((consultant) => (
              <option
                key={consultant.consultant_id}
                value={consultant.consultant_id}
              >
                {consultant.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="client"
            id="client"
            onChange={(e) =>
              setConsultantAssignment(
                consultAssignment && {
                  ...consultAssignment,
                  client_id: +e.target.value,
                }
              )
            }
            value={consultAssignment?.client_id || ''}
            required
          >
            {clients.map((client) => (
              <option key={client.client_id} value={client.client_id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="partner"
            id="partner"
            onChange={(e) =>
              setConsultantAssignment(
                consultAssignment && {
                  ...consultAssignment,
                  partner_id: +e.target.value,
                }
              )
            }
            value={consultAssignment?.partner_id || ''}
            required
          >
            {partners.map((partner) => (
              <option key={partner.partner_id} value={partner.partner_id}>
                {partner.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="month"
            id="month"
            onChange={(e) =>
              setConsultantAssignment(
                consultAssignment && {
                  ...consultAssignment,
                  month: e.target.value,
                }
              )
            }
            value={consultAssignment?.month || ''}
            required
          >
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <Input
          placeholder="Hourly Rate Consultant"
          type="number"
          value={consultAssignment?.cost_fulltime}
          onChange={(e) =>
            setConsultantAssignment(
              consultAssignment && {
                ...consultAssignment,
                cost_fulltime: +e.target.value,
              }
            )
          }
          required
        />
        <Input
          placeholder="Hourly Rate Client"
          type="number"
          value={consultAssignment?.hourly_rate}
          onChange={(e) =>
            setConsultantAssignment(
              consultAssignment && {
                ...consultAssignment,
                hourly_rate: +e.target.value,
              }
            )
          }
          required
        />
        <Input
          placeholder="Worked Hours"
          type="number"
          value={consultAssignment?.hours_worked}
          onChange={(e) =>
            setConsultantAssignment(
              consultAssignment && {
                ...consultAssignment,
                hours_worked: +e.target.value,
              }
            )
          }
          required
        />
        <Button type="submit">Update Assignment</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
}
