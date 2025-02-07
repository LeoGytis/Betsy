export const registerUser = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return fetch("http://localhost:3000/register", {
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

export const loginUser = async (email: string, password: string) => {
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.error || "Login failed");
      });
    }
    return res.json();
  });
};
