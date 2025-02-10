import apiRequest from "./apiService";

export const getMyTransactions = async (
  type?: string,
  id?: string,
  page: number = 1,
  limit: number = 100
) => {
  let url = `/my-transactions?page=${page}&limit=${limit}`;

  if (type) {
    url += `&type=${type}`;
  }

  if (id) {
    url += `&id=${id}`;
  }

  const data = await apiRequest(url);
  return Array.isArray(data.data) ? data.data : [];
};
