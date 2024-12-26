"use client";
import CompletionReport from "@/components/dashboard/CompletionReport";
import EditReport from "@/components/dashboard/EditReport";
import MyReport from "@/components/dashboard/MyReport";
import Navbar from "@/components/dashboard/Navbar";
import PerformanceFeedback from "@/components/dashboard/PerformanceFeedback";
import PerformanceGrade from "@/components/dashboard/PerformanceGrade";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function DashboardStaffPage() {
  return (
    <main>
      <Navbar title="Dashboard" />

      <div className="flex max-lg:block gap-5 mt-5 max-lg:space-y-5">
        <div className="flex flex-col gap-5 max-lg:w-full w-7/12">
          <div className="flex max-lg:space-y-5 max-lg:block gap-5">
            <EditReport root="/staff" />
            <CompletionReport />
          </div>
          <MyReport root="/staff" />
        </div>
        <div className="flex flex-col max gap-5 max-lg:w-full w-5/12">
          <PerformanceGrade />
          <PerformanceFeedback />
        </div>
      </div>
    </main>
  );
}
