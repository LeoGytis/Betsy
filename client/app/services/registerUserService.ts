import apiRequest from "./apiService"; // Import the apiRequest function

interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerUserNew = ({
  name,
  email,
  password,
  confirmPassword,
}: RegisterUserParams): Promise<any> => {
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
