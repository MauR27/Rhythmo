import React from "react";
import { fetchAllProducts } from "./AllProducts";
import AdminDashboardCard from "./AdminDashboardCard";

const AdminDashboard = async () => {
  const instruments = await fetchAllProducts();
  return (
    <>
      <AdminDashboardCard products={instruments} />
    </>
  );
};

export default AdminDashboard;
