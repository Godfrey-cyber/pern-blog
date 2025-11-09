import { axiosInstance } from "../utilities/utiles.js";
import { logout, loginStart, loginSuccess, loginFailure, getCurrentUserStart, getCurrentUserSuccess, getCurrentUserFailure, signUpStart, signUpSuccess, signUpFailure } from "./userSlice.js";

// @User logout
export const logoutUser = () => async dispatch => {
  try {
    await axiosInstance.post("/users/logout");
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    dispatch(logout()); // always clear local state
  }
};

// @User login
export const loginUser = (loginData, navigate, toast) => async dispatch => {
	dispatch(loginStart());
	try {
		const res = await axiosInstance.post("/users/login", loginData);
		dispatch(loginSuccess(res.data));
		navigate("/");
		toast.success("Successfully Logged in🥇");
	} catch (error) {
		dispatch(loginFailure(error.response?.data?.msg || "Login failed"));
    console.log(error)
		toast.error(error?.response?.data?.error || "Login failed. Try again.");
	}
}
// @User register
export const signUpUser = (signUpData, navigate, toast) => async dispatch => {
  dispatch(signUpStart());
  try {
    const res = await axiosInstance.post("/users/signup", signUpData);

    if (res.status === 201 || res.statusText === "OK") {
      dispatch(signUpSuccess(res.data));
      navigate("/auth/login");
      toast.success("Account Successfully Created 🥇");
    }
  } catch (error) {
    dispatch(signUpFailure(error?.response?.data?.msg || "Signup failed"));
    toast.error(error?.response?.data?.msg || "Signup failed");
  }
};
// @Token refresh
export const refreshUser = () => async dispatch => {
  dispatch(getCurrentUserStart());
  try {
    const response = await axiosInstance.get("/users/refresh", {
      withCredentials: true,
    });

    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserFailure("Session expired. Please log in again."));
  }
};