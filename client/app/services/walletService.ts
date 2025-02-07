import { BASE_URL } from "../utils/constants";

export const displayBalance = async () => {
  return fetch(`${BASE_URL}/my-balance`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Failed to fetch wallet balance");
      });
    }
    return res.json();
  });
};

export const listTransactions = async (
  type?: string,
  transactionId?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  let url = `${BASE_URL}/my-transactions?page=${page}&pageSize=${pageSize}`;

  if (type) {
    url += `&type=${type}`;
  }

  if (transactionId) {
    url += `&id=${transactionId}`;
  }

  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Failed to fetch transactions");
      });
    }
    return res.json();
  });
};
