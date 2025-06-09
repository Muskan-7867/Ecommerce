import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface UpdateOrderStatusParams {
  orderId: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
}

export interface UpdatePaymentStatusParams {
  orderId: string;
  paymentStatus: 'success' | 'pending' | 'failed';
}

export interface UpdatePaymentPaidStatusParams {
  orderId: string;
  isPaid: boolean;
}

// Create and configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to inject token
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const updateOrderStatus = async (params: UpdateOrderStatusParams) => {
  const response = await apiClient.patch(
    `/api/v1/order/${params.orderId}/status`,
    { status: params.status }
  );
  return response.data;
};

export const updatePaymentStatus = async (params: UpdatePaymentStatusParams) => {
  const response = await apiClient.patch(
    `/api/v1/order/${params.orderId}/payment-status`,
    { paymentStatus: params.paymentStatus }
  );
  return response.data;
};

export const updatePaymentPaidStatus = async (params: UpdatePaymentPaidStatusParams) => {
  const response = await apiClient.patch(
    `/api/v1/order/${params.orderId}/payment-paid`,
    { isPaid: params.isPaid }
  );
  return response.data;
};