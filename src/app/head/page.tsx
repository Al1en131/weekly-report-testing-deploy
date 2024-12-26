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
      <div className="grid grid-cols-[55%_45%] gap-5 mt-5 min-h-screen max-lg:flex flex-col">
        <div className="flex flex-col gap-5 w-full h-full max-lg:flex-col">
          <div className="flex gap-5 max-lg:flex-col">
            <EditReport root={"/head"} />
            <CompletionReport />
          </div>
          <ListStaff root="/head" />
          <MyReport root="/head" />
        </div>
        <div className="flex flex-col w-full gap-5  h-full">
          <PerformanceGrade />
          <PerformanceFeedback />
        </div>
      </div>
    </main>
  );
}
