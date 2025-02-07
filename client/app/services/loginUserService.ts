import apiRequest from "./apiService"; // Import the apiRequest function

interface LoginUserParams {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accessToken: string;
}

export const loginUser = ({
  email,
  password,
}: LoginUserParams): Promise<LoginUserResponse> => {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      return data;
    })
    .catch((error: { message: string }) => {
      throw new Error(error.message || "Login failed");
    });
};
