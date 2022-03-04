import React from "react";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <Navbar/>
      <Sidebar />
      <main className="admin-content">
        <div className="main-content">
            <Outlet/>
        </div>
      </main>
    </div>
  );
}