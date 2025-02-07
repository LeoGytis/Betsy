import apiRequest from "./apiService";

export const fetchTransactions = async (id, type, page, limit) => {
  try {
    const response = await apiRequest("/my-transactions", {
      method: "GET",
      body: JSON.stringify({ id, type, page, limit }),
    });
    return response;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
