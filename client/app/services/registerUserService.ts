import apiRequest from "./apiService";

interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterUserResponse {
  id: string;
  name: string;
}

export const registerUser = ({
  name,
  email,
  password,
  confirmPassword,
}: RegisterUserParams): Promise<RegisterUserResponse> => {
  return apiRequest("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, confirmPassword }),
  })
    .then((data) => {
      return data;
    })
    .catch((error: { message: string }) => {
      throw new Error(error.message || "Registration failed");
    });
};
