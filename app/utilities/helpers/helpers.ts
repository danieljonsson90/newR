import { ConsultantAssignment } from '@/app/core/types/types';

export const calculateRevenueMarginAndProfit = (
  consultAssignment: ConsultantAssignment
): { totalRevenue: number; margin: number; profit: number } => {
  const totalRevenue =
    +(consultAssignment?.hourly_rate ?? 0) *
    +(consultAssignment?.hours_worked ?? 0);
  if (totalRevenue === 0) return { totalRevenue, margin: 0, profit: 0 }; // Avoid division by zero
  const totalCost =
    +(consultAssignment?.cost_fulltime ?? 0) *
    +(consultAssignment?.hours_worked ?? 0);
  const margin = Math.round(((totalRevenue - totalCost) / totalRevenue) * 100); // Return margin as a percentage
  const profit = totalRevenue - totalCost;
  return { totalRevenue, margin, profit };
};

export const createConsultantAssignmentObject = (): ConsultantAssignment => {
  return {
    month: undefined,
    cost_fulltime: undefined,
    hourly_rate: undefined,
    hours_worked: undefined,
    total_revenue: undefined,
    margin_percent: undefined,
    profit: undefined,
  };
};
