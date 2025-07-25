'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsultants } from '@/app/core/queries/consultant-queries';
import { getClients } from '@/app/core/queries/client-queries';
import {
  Client,
  Consultant,
  ConsultantAssignment,
  Partner,
} from '@/app/core/types/types';
import { getPartners } from '@/app/core/queries/partner-queries';
import { createNewConsultantAssignment } from '@/app/core/commands/consult-assignment-commands';
import {
  calculateRevenueMarginAndProfit,
  createConsultantAssignment,
} from '@/app/utilities/helpers/helpers';

export function CreateConsultantAssignment() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [consultAssignment, setConsultantAssignment] =
    useState<ConsultantAssignment>(createConsultantAssignment());

  useEffect(() => {
    const fetchData = async () => {
      const consultants = await getConsultants();
      setConsultants(consultants);
      const clients = await getClients();
      setClients(clients);
      const partners = await getPartners();
      setPartners(partners);
      setLoading(false);
    };
    fetchData();
  }, []);

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

  const create = async () => {
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

    const { data, error } = await createNewConsultantAssignment(
      consultAssignment as ConsultantAssignment
    );
    if (error) {
      setLoading(false);
      console.error('Error adding consultant assignment:', error);
      setError(error.message);
    } else {
      console.log('Consultant assignment added:', data);
      router.push('/assignments'); // Redirect to the consultants page
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Link href="/assignments">Back</Link>
      <h1>Create Consultant Assignment</h1>
      <p>Fill in the form below to create a new consultant assignment.</p>
      <br />
      <form onSubmit={create}>
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
            required
          >
            <option value="" disabled selected hidden>
              Select consultant
            </option>
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
            required
          >
            <option value="" disabled selected hidden>
              Select client
            </option>
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
            required
          >
            <option value="" disabled selected hidden>
              Select partner
            </option>
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
            required
          >
            <option value="" disabled selected hidden>
              Select month
            </option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <Input
          placeholder="Cost full time"
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
          placeholder="Hourly rate"
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
          placeholder="Hours worked"
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
        <Button type="submit">Create Assignment</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
}
