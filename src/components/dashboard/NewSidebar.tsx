"use client";

import "animate.css";

import ButtonSidebar from "./ButtonSidebar";
import SidebarMobile from "./SidebarMobile";
import SidebarMenu from "./SidebarMenu";
import SidebarDesktop from "./SidebarDesktop";
import useActive from "@/hooks/useActive";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getId, getToken } from "@/utils/token";

type SidebarProps = {
  navLink: {
    title: string;
    menu?: { title: string; url: string }[];
    path: string | RegExp;
    id: string;
    icon: React.ReactNode;
  }[];
  linkProfile: string;
  root: string;
  className?: string;
};

export default function NewSidebar({
  navLink,
  linkProfile,
  root,
  className
}: SidebarProps) {
  const { isActive } = useActive();
  const [account, setAccount] = useState<any>({});
  const token = getToken();
  const uuid = getId();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`/api/authz/users/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccount({
          name: user.data?.data?.name,
          image: user.data?.data?.image,
          division: user.data?.data?.division?.name,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [token, uuid]);

  return (
    <div id="first-driver" className={`fixed z-20 inset-y-0 ${className}`}>
      {/* // <> */}
      <ButtonSidebar />
      {/* Sidebar mobile */}
      <SidebarMobile profileLink={linkProfile} root={root} navLink={navLink}>
        {navLink
          .filter((v) => v.menu)
          .map((v, i) => {
            return (
              <React.Fragment key={i}>
                {isActive ? (
                  <div id={v.id}>
                    <SidebarMenu
                      key={i}
                      mode="MOBILE"
                      data={{
                        icon: v.icon,
                        id: v.id,
                        title: v.title,
                        menu: v.menu as unknown as any[],
                      }}
                      path={v.path}
                    />
                  </div>
                ) : (
                  <SidebarMenu
                    key={i}
                    mode="MOBILE"
                    data={{
                      icon: v.icon,
                      id: v.id,
                      title: v.title,
                      menu: v.menu as unknown as any[],
                    }}
                    path={v.path}
                  />
                )}
              </React.Fragment>
            );
          })}
      </SidebarMobile>
      {/* Sidebar Desktop */}
      <SidebarDesktop
        value={account}
        profileLink={linkProfile}
        root={root}
        navLink={navLink}
      >
        {navLink
          .filter((v) => v.menu)
          .map((v, i) => {
            return (
              <div id={v.id} key={i}>
                <SidebarMenu
                  key={i}
                  mode="DESKTOP"
                  data={{
                    id: v.id,
                    icon: v.icon,
                    title: v.title,
                    menu: v.menu as unknown as any[],
                  }}
                  path={v.path}
                />
              </div>
            );
          })}
      </SidebarDesktop>
    </div>
  );
}
