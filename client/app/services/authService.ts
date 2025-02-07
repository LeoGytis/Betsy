import { BASE_URL } from "../utils/constants";

export const registerUserOld = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Registration failed");
      });
    }
    return res.json();
  });
};

export const loginUserOld = async (email: string, password: string) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.error || "Login failed");
      });
    }
    return res.json().then((data) => {
      localStorage.setItem("token", data.token);
      return data;
    });
  });
};
