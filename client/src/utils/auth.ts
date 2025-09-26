import api from "./api";

export const register = async (data: {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: "guest" | "host";
  propertyName?: string;
  propertyType?: "hotel" | "apartment" | "guesthouse" | "resort";
  address?: string;
  city?: string;
  country?: string;
  bankAccount?: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);

  // save auth info
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data; // returns { message, token, user }
};

// helper to get logged-in user
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// helper to logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
