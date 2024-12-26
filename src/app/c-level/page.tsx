"use client";
import Navbar from "@/components/dashboard/Navbar";
import "driver.js/dist/driver.css";
import MyData from "@/components/dashboard/MyData";
import ListStaff from "@/components/dashboard/c-level/ListStaff";
import MyReport from "@/components/dashboard/c-level/MyReport";
import { useEffect, useState } from "react";
import axios from "axios";


export default function DashboardStaffPage() {
  return (
    <main>
      <Navbar title="Dashboard" />
      <div className="mt-5 min-h-screen">
        <div className="flex max-lg:block max-lg:space-y-5 gap-5 w-full h-full">
          <div className="w-8/12 max-lg:w-full">
            <ListStaff root="/c-level" />
          </div>
          <div className="w-4/12 max-lg:w-full">
            <MyData />
          </div>
        </div>
        <MyReport />
      </div>
    </main>
  );
}
