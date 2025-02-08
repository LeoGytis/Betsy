import { RegisterUserProps } from "../utils/constants";
import apiRequest from "./apiService";

export interface RegisterUserResponse {
  id: string;
  name: string;
}

export const registerUser = ({
  name,
  email,
  password,
  confirmPassword,
}: RegisterUserProps): Promise<RegisterUserResponse> => {
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
