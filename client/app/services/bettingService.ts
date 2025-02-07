import { BASE_URL } from "../utils/constants";
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
    .catch((error: { message: string }) => {
      throw new Error(error.message || "Failed to bet");
    });
};

export const listBets = async (
  status?: string,
  betId?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  let url = `${BASE_URL}/my-bets?page=${page}&pageSize=${pageSize}`;

  if (status) {
    url += `&status=${status}`;
  }

  if (betId) {
    url += `&id=${betId}`;
  }

  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Failed to fetch bets");
      });
    }
    return res.json();
  });
};

export const cancelBet = async (betId: string) => {
  return fetch(`${BASE_URL}/my-bet/${betId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Failed to cancel bet");
      });
    }
    return res.json();
  });
};
