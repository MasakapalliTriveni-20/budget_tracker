import React from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = ({ children }) => (
  <div className="dashboard-layout">
    <Header />
    <Sidebar />
    <main>{children}</main>
  </div>
);

export default DashboardLayout;
