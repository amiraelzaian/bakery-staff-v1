import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import LoginPage from "../pages/Login/LoginPage";

import AdminLayout from "../layouts/AdminLayout";
import BakerLayout from "../layouts/BakerLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";

import AdminDashboard from "../pages/Admin/Dashboard";
import BakerDashboard from "../pages/Baker/Dashboard";
import DeliveryDashboard from "../pages/Delivery/Dashboard";

import Categories from "../pages/Admin/Categories";
import Logs from "../pages/Admin/Logs";
import AdminOrders from "../pages/Admin/Orders";
import Products from "../pages/Admin/Products";
import Coupons from "../pages/Admin/Coupons";
import Analytics from "../pages/Admin/Analytics";
import Offers from "../pages/Admin/Offers"; // 

import BakerOrders from "../pages/Baker/Orders";

import Deliveries from "../pages/Delivery/Deliveries";


import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import OrderDetails from "../pages/Baker/OrderDetails";
import AdminOrderDetails from "../pages/Admin/OrderDetails";
import DeliveryDetails from "../pages/Delivery/DeliveryDetails";
import ProductDetails from "../pages/Admin/ProductDetails";
import Users from "../pages/Admin/Users";
import UserDetails from "../pages/Admin/UserDetails";
import FailedOrders from "../pages/Admin/FailedOrders";
import RefundedOrders from "../pages/Admin/RefundedOrders";
import OrdersLayout from "../pages/Admin/OrdersLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<OrdersLayout />}>
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/failed" element={<FailedOrders />} />
              <Route path="orders/refunded" element={<RefundedOrders />} />
           </Route>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders/:orderId" element={<AdminOrderDetails />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UserDetails />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="seasonal-offers" element={<Offers />} /> {/* NEW */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="audit-logs" element={<Logs />} />
          </Route>
        </Route>

        {/* Baker */}
        <Route element={<ProtectedRoute allowedRoles={["baker"]} />}>
          <Route path="/baker" element={<BakerLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<BakerDashboard />} />
            <Route path="orders" element={<BakerOrders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
          </Route>
        </Route>

        {/* Delivery */}
        <Route element={<ProtectedRoute allowedRoles={["delivery"]} />}>
          <Route path="/delivery" element={<DeliveryLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DeliveryDashboard />} />
            <Route path="deliveries" element={<Deliveries />} />
            <Route path="deliveries/:orderId" element={<DeliveryDetails/>} />
         </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}