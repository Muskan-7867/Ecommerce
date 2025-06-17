import axios from "axios";
import Cookies from "js-cookie";
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse
} from "../types/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = Cookies.get("authToken")

// Login
const loginUser = async (userData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/api/v1/user/login`,
      userData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      }
    );
    return response.data;
  } catch {
    const message = "Login failed";
    throw new Error(message);
  }
};

// Register
const registerUser = async (
  userData: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${BASE_URL}/api/v1/user/register`,
      userData,
      
    );
    console.log("from auth", response.data)
    return response.data;
  } catch {
    const message = "Registration failed";
    throw new Error(message);
  }
};


export const forgotPassword = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset email");
    }

    return data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

export const resetPassword = async (token: string | undefined, newPassword: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/resetpassword/${token}`,
      { newPassword }
    );
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
    throw new Error('An unexpected error occurred');
  }
};

export { loginUser, registerUser };
