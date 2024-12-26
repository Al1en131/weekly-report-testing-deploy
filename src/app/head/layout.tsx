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
      path: "/head",
      id: "",
      icon: <DashboardIcon />,
    },
    {
      title: "Weekly Report",
      id: "seventh-driver",
      path: "/head/weekly-report",
      icon: <TaskSquareIcon />,
    },
    {
      title: "My Staff Report",
      path: "/head/my-staff-report",
      id: "nine-driver",
      icon: <PeopleIcon />,
    },
    {
      icon: <MessageAddIcon />,
      title: "Add Feedback",
      id: "eleven-driver",
      path: "/head/feedback/add",
      menu: [
        { title: "June", url: "/head/feedback/add/june" },
        { title: "July", url: "/head/feedback/add/july" },
        { title: "August", url: "/head/feedback/add/august" },
        { title: "September", url: "/head/feedback/add/september" },
      ],
    },
    {
      icon: <UserIcon />,
      title: "Staff KPI",
      id: "first-driver-staff-kpi",
      path: "/head/staff-kpi",
      menu: [
        { title: "June", url: "/head/staff-kpi/june" },
        { title: "July", url: "/head/staff-kpi/july" },
        { title: "August", url: "/head/staff-kpi/august" },
        { title: "September", url: "/head/staff-kpi/september" },
      ],
    },
    {
      icon: <DocumentTextIcon />,
      title: "Add Division KPI",
      id: "first-driver-division-head-kpi",
      path: "/head/division-kpi/add",
      menu: [
        { title: "June", url: "/head/division-kpi/add/june" },
        { title: "July", url: "/head/division-kpi/add/july" },
        { title: "August", url: "/head/division-kpi/add/august" },
        { title: "September", url: "/head/division-kpi/add/september" },
      ],
    },
  ];

  const linkProfile = "/head/profile/edit";
  return (
    <main className="flex w-full min-h-screen z-10 shadow-lg bg-primary text-primary">
      <NewSidebar linkProfile={linkProfile} navLink={navLink} root="/head" />

      {!path.match(
        /(\/head\/staff-kpi\/.*|\/head\/division-kpi\/add\/.*)/i
      ) && <Alert root="/head" />}

      <Success redirect="/head" />

      <Error redirect="/head" />
      <Delete redirect="/head" />
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