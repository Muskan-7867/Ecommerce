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

export const updateOrderStatus = async (params: UpdateOrderStatusParams) => {
    const token = Cookies.get('authToken')
    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/order/${params.orderId}/status`,
      { status: params.status },
       { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    },
      
    );
    return response.data;
 
};

export const updatePaymentStatus = async (params: UpdatePaymentStatusParams) => {
    const token = Cookies.get('authToken')
    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/order/${params.orderId}/payment-status`,
      { paymentStatus: params.paymentStatus },
      { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    },
    
    );
    return response.data;
  
};

export const updatePaymentPaidStatus = async (params: UpdatePaymentPaidStatusParams) => {
   const token = Cookies.get('authToken')
    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/order/${params.orderId}/payment-paid`,
      { isPaid: params.isPaid },
       { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    },
  
    );
    return response.data;
  
};