export interface ProductImage {
  url: string;
}

export interface Product {
  name: string;
  images: ProductImage[];
  // Add more fields as needed
}

export interface OrderItem {
  product: Product;
  price: number;
}

export interface Payment {
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
   paidAt?: string;
}

export interface Order {
  _id: string;
  quantity: number;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  payment: Payment;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  deliveredAt: string
}
