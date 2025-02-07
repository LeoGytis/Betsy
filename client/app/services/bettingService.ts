export const placeBet = async (amount: number, walletBalance: number) => {
  if (amount < 1 || amount > walletBalance) {
    throw new Error(
      "Invalid bet amount: Minimum €1.00 and cannot exceed wallet balance"
    );
  }

  return fetch("http://localhost:3000/bet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Failed to place bet");
      });
    }
    return res.json();
  });
};

export const listBets = async (
  status?: string,
  betId?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  let url = `http://localhost:3000/my-bets?page=${page}&pageSize=${pageSize}`;

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
  return fetch(`http://localhost:3000/my-bet/${betId}`, {
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
