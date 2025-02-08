export const BASE_URL = "http://localhost:3000";

export enum BetStatus {
  Lost = "lost",
  Win = "win",
  Canceled = "canceled",
}

export enum Color {
  Green = "text-green border border-green-500 p-2", // Win
  Red = "bg-red-500", // Lost
  Orange = "bg-orange-500", // Canceled
}

export const statusToColorMap: Record<BetStatus, Color> = {
  [BetStatus.Win]: Color.Green,
  [BetStatus.Lost]: Color.Red,
  [BetStatus.Canceled]: Color.Orange,
};
