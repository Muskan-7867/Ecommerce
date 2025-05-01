import React from "react";

import Login from "../pages/admin/auth/Login";
import Register from "../pages/admin/auth/Register";
import { Dashboard } from "../pages/admin/dashboard";
import  Product from "../pages/admin/products/Product"
import Order from "../pages/admin/order/Order"
import Customers from "../pages/admin/customers/customers";
import AddProductForm from "../pages/admin/products/components/AddProductForm";

interface RootDocument {
  href: string;
  page: React.FC;
  children?: RootDocument[];
}
 
const Admin_auth_routes: RootDocument[] = [
  {
    href: "adminlogin",
    page: Login
  },
  {
    href: "adminregister",
    page: Register
  }
];

const Admin_Private_routes: RootDocument[] = [
  {
    href: "dashboard",
    page: Dashboard
  },
  {
    href: "order",
    page: Order
  },

  {
    href: "products",
    page: Product
  },

  {
    href: "customers",
    page: Customers
  },
  {
    href: "productform",
    page: AddProductForm
  },
  


];

export { Admin_auth_routes, Admin_Private_routes };
