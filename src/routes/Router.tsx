import { Route, Routes } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import { AboutUs, Contact, Home, ProductPageLayout } from "../pages/user";
import Can from "../components/3D/Can";

import AddressForm from "../pages/user/order/components/AddressForm";
import Cart from "../pages/user/cart/Cart";
import ProductDisplay from "../pages/user/products/components/ProductDisplay";
import Profile from "../pages/user/profile/Profile";
import EditProfile from "../pages/user/profile/components/EditProfile";
import NotFoundPage from "../components/common/NotFoundPage";
import AdminPublicLayout from "../layout/admin/AdminPublicLayout";
import { Admin_auth_routes, Admin_Private_routes } from "./constants";
import React from "react";
import AdminPrivateLayout from "../layout/admin/AdminPrivateLayout";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<ProductPageLayout />} />
          <Route path="/can" element={<Can />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDisplay />} />
          <Route path="/addressform/:userId" element={<AddressForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:userId" element={<EditProfile />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>

        {/* for admin */}
        <Route path="/" element={<AdminPublicLayout />}>
          {Admin_auth_routes.map((route, i) => (
            <Route
              key={`ADMIN_AUTH_ROUTE_${i}`}
              path={route.href}
              element={React.createElement(route.page)}
            />
          ))}
        </Route>

        <Route path="/admin/" element={<AdminPrivateLayout />}>
          {Admin_Private_routes?.map((route, i) => (
            <Route
              key={`ADMIN_PRIVATE_ROUTE_${i}`}
              path={route.href}
              element={React.createElement(route.page)}
            />
          ))}
        </Route>

      </Routes>
    </>
  );
};

export default Router;
