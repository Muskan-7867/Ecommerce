import axios from "axios";
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse
} from "../types/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

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
      userData
    );
    return response.data;
  } catch {
    const message = "Registration failed";
    throw new Error(message);
  }
};

//add user address


export { loginUser, registerUser };
