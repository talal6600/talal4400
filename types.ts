export type SimType = 'jawwy' | 'sawa' | 'multi';
export type TxType = SimType | 'issue';
export type Theme = 'light' | 'dark';

export interface Transaction {
  id: number;
  date: string; // ISO string
  type: TxType;
  amt: number;
  sims: number;
}

export interface StockLogEntry {
  date: string;
  type: SimType;
  qty: number;
  action: 'add' | 'return_company' | 'to_damaged' | 'recover' | 'flush';
}

export interface FuelLogEntry {
  id: number;
  date: string;
  type: '91' | '95' | 'diesel';
  amount: number;
  liters: number;
  km: number;
}

export interface StockState {
  jawwy: number;
  sawa: number;
  multi: number;
}

export interface AppSettings {
  name: string;
  theme: Theme;
  weeklyTarget: number;
}

export interface Database {
  tx: Transaction[];
  stock: StockState;
  damaged: StockState;
  stockLog: StockLogEntry[];
  fuelLog: FuelLogEntry[];
  settings: AppSettings;
}

export const INITIAL_DB: Database = {
  tx: [],
  stock: { jawwy: 0, sawa: 0, multi: 0 },
  damaged: { jawwy: 0, sawa: 0, multi: 0 },
  stockLog: [],
  fuelLog: [],
  settings: { name: 'مستر مندوب Pro', theme: 'light', weeklyTarget: 3500 }
};

export const LABELS: Record<string, string> = {
  jawwy: 'شريحة جوّي',
  sawa: 'شريحة سوا',
  multi: 'عميل متعددة',
  issue: 'لم يتم الاكمال'
};

export const FUEL_PRICES: Record<string, number> = { 
  '91': 2.18, 
  '95': 2.33, 
  'diesel': 1.15 
};