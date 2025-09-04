import { axiosInstance } from "../utilities/utiles.js";

export const registerUser = async (signUpData) => {
  const res = await axiosInstance.post("/users/signup", signUpData);
  if (res.status === 201 || res.statusText === "Created" || res.statusText === "OK") {
    return res.data;
  }
  throw new Error("Signup failed");
};