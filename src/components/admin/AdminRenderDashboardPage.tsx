import React from "react";
import { fetchAllProducts } from "../products/ProductsRenderAllPage";
import AdminRenderDashboard from "./AdminRenderDashboard";

const AdminRenderDashboardPage = async () => {
  const instruments = await fetchAllProducts();
  return (
    <>
      <AdminRenderDashboard products={instruments} />
    </>
  );
};

export default AdminRenderDashboardPage;
