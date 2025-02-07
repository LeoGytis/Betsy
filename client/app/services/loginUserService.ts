import apiRequest from "./apiService"; // Import the apiRequest function

interface LoginUserParams {
  email: string;
  password: string;
}

export const loginUserNew = ({
  email,
  password,
}: LoginUserParams): Promise<any> => {
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
