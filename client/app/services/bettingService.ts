import { ErrorResponse } from "../utils/constants";
import apiRequest from "./apiService";

interface PlaceBetResponse {
  transactionId: string;
  currency: string;
  balance: number | null;
  winAmount: number | null;
}

export const placeBet = (amount: number): Promise<PlaceBetResponse> => {
  return apiRequest("/bet", {
    method: "POST",
    body: JSON.stringify({ amount }),
  })
    .then((data) => {
      return data;
    })
    .catch((error: ErrorResponse) => {
      throw new Error(error.message || "Failed to bet");
    });
};

export const getBetsList = async (
  status?: string,
  betId?: string,
  page: number = 1,
  limit: number = 100
) => {
  let url = `/my-bets?page=${page}&limit=${limit}`;

  if (status) {
    url += `&status=${status}`;
  }

  if (betId) {
    url += `&id=${betId}`;
  }

  const data = await apiRequest(url);
  return Array.isArray(data.data) ? data.data : [];
};

export const deleteBet = async (betId: string) => {
  const url = `/my-bet/${betId}`;

  return apiRequest(url, {
    method: "DELETE",
  })
    .then((data) => {
      return data;
    })
    .catch((error: ErrorResponse) => {
      throw new Error(error.message || "Failed to cancel bet");
    });
};
