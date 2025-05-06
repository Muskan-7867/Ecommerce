export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;

  };
}
export interface CurrentUser {
  _id: number;
  username?: string;
  email: string;
  role: string;
  address?: string;
  contact?:string;
  
};

export interface AddressFormData {
  phone: string;
  street: string;
  address?: string;
  address1?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}