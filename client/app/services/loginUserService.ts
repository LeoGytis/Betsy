import apiRequest from "./apiService";

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
      localStorage.setItem("token", data.accessToken);
      return data;
    })
    .catch((error: { message: string }) => {
      throw new Error(error.message || "Login failed");
    });
};
