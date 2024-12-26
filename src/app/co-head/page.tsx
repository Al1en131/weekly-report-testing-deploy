"use client";
import CompletionReport from "@/components/dashboard/CompletionReport";
import EditReport from "@/components/dashboard/EditReport";
import MyReport from "@/components/dashboard/MyReport";
import Navbar from "@/components/dashboard/Navbar";
import PerformanceFeedback from "@/components/dashboard/PerformanceFeedback";
import PerformanceGrade from "@/components/dashboard/PerformanceGrade";
import "driver.js/dist/driver.css";
import ListStaff from "@/components/dashboard/ListStaff";



export default function DashboardStaffPage() {
  return (
    <main>
      <Navbar title="Dashboard" />

      <div className="w-full grid grid-cols-1 md:grid-cols-[55%_45%] gap-5 mt-5 min-h-screen">
        <div className="flex flex-col gap-5 w-full h-full">
          <div className="w-full flex flex-col md:flex-row gap-5">
            <EditReport root={"/co-head"} />
            <CompletionReport />
          </div>

          <ListStaff root="/co-head" />
          <MyReport root="/co-head" />
        </div>
        <div className="w-full flex flex-col gap-5  h-full">
          <PerformanceGrade />

          <PerformanceFeedback />
        </div>
      </div>
    </main>
  );
}
