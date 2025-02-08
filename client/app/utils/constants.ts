export const BASE_URL = "http://localhost:3000";

export enum BetStatus {
  Lost = "lost",
  Win = "win",
  Canceled = "canceled",
}

export enum Color {
  Green = "text-green-500 border-green-500", // Win
  Red = "text-red-500 border-red-500", // Lost
  Orange = "text-orange-500 border-orange-500", // Canceled
}

export const statusColor: Record<BetStatus, Color> = {
  [BetStatus.Win]: Color.Green,
  [BetStatus.Lost]: Color.Red,
  [BetStatus.Canceled]: Color.Orange,
};
