export interface Partner {
  partner_id: number;
  name: string;
}

export interface Consultant {
  consultant_id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Client {
  client_id: number;
  name: string;
}
export interface ConsultantAssignment {
  assignment_id?: number;
  consultant_id: number;
  client_id: number;
  partner_id: number;
  month: string;
  cost_fulltime?: number;
  hourly_rate?: number;
  hours_worked?: number;
  total_revenue: number;
  margin_percent: number;
  profit: number;
  Consultant?: Consultant;
  Client?: Client;
  Partner?: Partner;
}
