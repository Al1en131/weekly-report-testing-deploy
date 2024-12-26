"use client";

import Alert from "@/components/dashboard/Alert";
import Logout from "@/components/dashboard/Logout";
import NewSidebar from "@/components/dashboard/NewSidebar";
import { usePathname } from "next/navigation";

import Success from "@/components/dashboard/weekly-report/Success";
import {
  DashboardIcon,
  DocumentIcon,
  MessageAddIcon,
} from "@/components/icons";
import TaskIcon from "@/components/icons/Task";
import useActive from "@/hooks/useActive";
import Delete from "@/components/dashboard/weekly-report/Delete";
import Error from "@/components/dashboard/weekly-report/Error";
import DivisionIcon from "@/components/icons/Division";

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
      path: "/c-level",
      id: "",
      icon: <DashboardIcon />,
    },
    {
      icon: <MessageAddIcon />,
      title: "Add Feedback",
      id: "fifth-driver",
      menu: [
        { title: "June", url: "/c-level/feedback/add/june" },
        { title: "July", url: "/c-level/feedback/add/july" },
        { title: "August", url: "/c-level/feedback/add/august" },
        { title: "September", url: "/c-level/feedback/add/september" },
      ],
      path: /\/c-level\/feedback\/add/i,
    },
    {
      icon: <TaskIcon />,
      title: "All Feedbacks",
      id: "seventh-driver",
      menu: [
        { title: "June", url: "/c-level/feedback/june" },
        { title: "July", url: "/c-level/feedback/july" },
        { title: "August", url: "/c-level/feedback/august" },
        { title: "September", url: "/c-level/feedback/september" },
      ],
      path: /c-level\/feedback\/(?!add)/i,
    },
    {
      icon: <DocumentIcon />,
      title: "Division KPI",
      id: "first-driver-division-clevel-kpi",
      menu: [
        { title: "July", url: "/c-level/division-kpi/July" },
        { title: "August", url: "/c-level/division-kpi/August" },
        { title: "September", url: "/c-level/division-kpi/September" },
      ],
      path: /c-level\/division-kpi/i,
    },
    {
      icon: <DivisionIcon />,
      title: "Division",
      path: "/c-level/division",
      id: "",
    },
  ];

  const linkProfile = "/c-level/profile/edit";
     {!path.match(/\/c-level\/division-kpi\/.*/i) && <Alert root="/c-level" />}
  return (
    <main className="flex w-full min-h-screen z-10 shadow-lg bg-primary text-primary">
      <NewSidebar linkProfile={linkProfile} navLink={navLink} root="/c-level" />
      {!path.match(/\/c-level\/division-kpi\/.*/i) && <Alert root="/c-level" />}
      <Success redirect="/c-level" />
      <Error redirect="/c-level" />
      <Delete redirect="/c-level" />
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