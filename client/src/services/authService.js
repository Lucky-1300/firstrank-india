import api from "../config/axios";

// export const loginUser = async (data) => {
//   const response = await api.post("/auth/login", data);
//   return response.data;
// };
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};



export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};