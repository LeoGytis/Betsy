import { TransactionProps } from "../utils/constants";
import apiRequest from "./apiService";

export const getMyTransactions = async (
  type?: string,
  id?: string,
  page: number = 1,
  limit: number = 100
): Promise<{
  data: TransactionProps[];
  total: number;
  page: number;
  limit: number;
}> => {
  let url = `/my-transactions?page=${page}&limit=${limit}`;

  if (type) {
    url += `&type=${type}`;
  }

  if (id) {
    url += `&id=${id}`;
  }

  const response = await apiRequest(url);
  return {
    data: response.data,
    total: response.total,
    page: response.page,
    limit: response.limit,
  };
};
