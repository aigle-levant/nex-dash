export interface Customer {
  id: number;
  broker_id: number;
  name: string;
  email: string;
  gstin: string;
  created_at: string;
  status?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  gstin?: string;
  is_admin: boolean;
}
