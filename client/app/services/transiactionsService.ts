import apiRequest from "./apiService";

export const getMyTransactions = async (
  status?: string,
  betId?: string,
  page: number = 1,
  limit: number = 100
) => {
  let url = `/my-transactions?page=${page}&limit=${limit}`;

  if (status) {
    url += `&status=${status}`;
  }

  if (betId) {
    url += `&id=${betId}`;
  }

  const data = await apiRequest(url);
  return Array.isArray(data.data) ? data.data : [];
};
