import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default AppRoutes;
