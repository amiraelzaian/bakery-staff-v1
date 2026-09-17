import { BrowserRouter, Route, Routes } from "react-router";

import LoginPage from "../pages/Login/LoginPage";

import AdminLayout from "../layouts/AdminLayout";
import BakerLayout from "../layouts/BakerLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";

import AdminDashboard from "../pages/Admin/Dashboard";
import BakerDashboard from "../pages/Baker/Dashboard";
import DeliveryDashboard from "../pages/Delivery/Dashboard";

import Categories from "../pages/Admin/Categories";
import Employees from "../pages/Admin/Employees";
import Logs from "../pages/Admin/Logs";
import AdminOrders from "../pages/Admin/Orders";
import Products from "../pages/Admin/Products";

import BakerOrders from "../pages/Baker/Orders";

import Deliveries from "../pages/Delivery/Deliveries";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="employees" element={<Employees />} />
          <Route path="audit-logs" element={<Logs />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<Products />} />
        </Route>

        {/* Baker */}
        <Route path="/baker" element={<BakerLayout />}>
          <Route path="dashboard" element={<BakerDashboard />} />
          <Route path="orders" element={<BakerOrders />} />
        </Route>

        {/* Delivery */}
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route path="dashboard" element={<DeliveryDashboard />} />
          <Route path="deliveries" element={<Deliveries />} />
        </Route>

         <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}