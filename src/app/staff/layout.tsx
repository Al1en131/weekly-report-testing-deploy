"use client";

import Alert from "@/components/dashboard/Alert";
import Logout from "@/components/dashboard/Logout";
import NewSidebar from "@/components/dashboard/NewSidebar";
import Delete from "@/components/dashboard/weekly-report/Delete";
import Error from "@/components/dashboard/weekly-report/Error";

import Success from "@/components/dashboard/weekly-report/Success";
import { DashboardIcon, TaskSquareIcon } from "@/components/icons";
import useActive from "@/hooks/useActive";

export default function LayoutSuperAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isActive } = useActive();
  const navLink = [
    {
      title: "Dashboard",
      path: "/staff",
      id: "",
      icon: <DashboardIcon />,
    },
    {
      title: "Weekly Report",
      path: "/staff/weekly-report",
      id: "seventh-driver",
      icon: <TaskSquareIcon />,
    },
  ];

  const linkProfile = "/staff/profile/edit";

  return (
    <main className="flex w-full min-h-screen z-10 shadow-lg bg-primary text-primary">
      <NewSidebar linkProfile={linkProfile} navLink={navLink} root="/staff" />
      <Alert root="/staff" />
      <Success redirect="/staff" />
      <Error redirect="/staff" />
      <Delete redirect="/staff" />
      <Logout />
      <div
        className={`transition-all z-10 bg-primary w-full min-h-screen ease-linear  duration-[400ms] absolute overflow-hidden ${
          isActive ? "pl-[104px]" : "pl-[256px]"
        } text-white`}
      >
        <div className="py-6 px-8">{children}</div>
      </div>
    </main>
  );
}