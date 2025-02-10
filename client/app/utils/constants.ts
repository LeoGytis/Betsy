export const BASE_URL = "http://localhost:3000";

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface BetProps {
  id: string;
  status: BetStatus;
  amount: number;
  winAmount: number;
  createdAt: Date;
}

export interface TransactionProps {
  id: string;
  type: TransactionType;
  amount: number;
  createdAt: Date;
}

export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginProps {
  email: string;
  password: string;
}

export enum Color {
  Green = "text-green-500 border-green-500", // Win
  Red = "text-red-500 border-red-500", // Lost
  Orange = "text-orange-500 border-orange-500", // Canceled
  Violet = "text-violet-500 border-violet-500", // Canceled
}

export enum BetStatus {
  Lost = "lost",
  Win = "win",
  Canceled = "canceled",
}

export const statusColor: Record<BetStatus, Color> = {
  [BetStatus.Win]: Color.Green,
  [BetStatus.Lost]: Color.Red,
  [BetStatus.Canceled]: Color.Orange,
};

export enum TransactionType {
  Bet = "bet",
  Cancel = "cancel",
  Win = "win",
}

export const typeColor: Record<TransactionType, Color> = {
  [TransactionType.Bet]: Color.Violet,
  [TransactionType.Cancel]: Color.Red,
  [TransactionType.Win]: Color.Green,
};

export interface FiltersProps {
  type?: string;
  status?: string;
}

export enum ActiveTab {
  MyBets = "myBets",
  MyTransactions = "myTransactions",
}
