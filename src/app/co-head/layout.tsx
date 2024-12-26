"use client";

import Alert from "@/components/dashboard/Alert";
import Logout from "@/components/dashboard/Logout";
import NewSidebar from "@/components/dashboard/NewSidebar";

import Success from "@/components/dashboard/weekly-report/Success";
import {
  DashboardIcon,
  DocumentTextIcon,
  MessageAddIcon,
  PeopleIcon,
  TaskSquareIcon,
} from "@/components/icons";
import UserIcon from "@/components/icons/User";
import useActive from "@/hooks/useActive";

import { usePathname } from "next/navigation";

import "driver.js/dist/driver.css";
import Delete from "@/components/dashboard/weekly-report/Delete";
import Error from "@/components/dashboard/weekly-report/Error";

export default function LayoutSuperAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isActive } = useActive();
  const path = usePathname();
  const navLink = [
    {
      title: "Dashboard",
      path: "/co-head",
      id: "",
      icon: <DashboardIcon />,
    },
    {
      title: "Weekly Report",
      id: "seventh-driver",
      path: "/co-head/weekly-report",
      icon: <TaskSquareIcon />,
    },
    {
      title: "My Staff Report",
      path: "/co-head/my-staff-report",
      id: "nine-driver",
      icon: <PeopleIcon />,
    },
    {
      icon: <MessageAddIcon />,
      title: "Add Feedback",
      id: "eleven-driver",
      path: "/co-head/feedback/add",
      menu: [
        { title: "June", url: "/co-head/feedback/add/june" },
        { title: "July", url: "/co-head/feedback/add/july" },
        { title: "August", url: "/co-head/feedback/add/august" },
        { title: "September", url: "/co-head/feedback/add/september" },
      ],
    },
    {
      icon: <UserIcon />,
      title: "Staff KPI",
      id: "first-driver-staff-kpi",
      path: "/co-head/staff-kpi",
      menu: [
        { title: "June", url: "/co-head/staff-kpi/june" },
        { title: "July", url: "/co-head/staff-kpi/july" },
        { title: "August", url: "/co-head/staff-kpi/august" },
        { title: "September", url: "/co-head/staff-kpi/september" },
      ],
    },
    {
      icon: <DocumentTextIcon />,
      title: "Add Division KPI",
      id: "first-driver-division-co-head-kpi",
      path: "/co-head/division-kpi/add",
      menu: [
        { title: "June", url: "/co-head/division-kpi/add/june" },
        { title: "July", url: "/co-head/division-kpi/add/july" },
        { title: "August", url: "/co-head/division-kpi/add/august" },
        { title: "September", url: "/co-head/division-kpi/add/september" },
      ],
    },
  ];

  const linkProfile = "/co-head/profile/edit";
  return (
    <main className="flex w-full min-h-screen z-10 shadow-lg bg-primary text-primary">
      <NewSidebar linkProfile={linkProfile} navLink={navLink} root="/co-head" />

      {!path.match(
        /(\/co-head\/staff-kpi\/.*|\/co-head\/division-kpi\/add\/.*)/i
      ) && <Alert root="/co-head" />}

      <Success redirect="/co-head" />

      <Error redirect="/co-head" />
      <Delete redirect="/co-head" />
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