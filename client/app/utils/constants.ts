export const BASE_URL = "http://localhost:3000";

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
  Prize = "prize",
}

export const typeColor: Record<TransactionType, Color> = {
  [TransactionType.Bet]: Color.Green,
  [TransactionType.Cancel]: Color.Red,
  [TransactionType.Prize]: Color.Orange,
};
