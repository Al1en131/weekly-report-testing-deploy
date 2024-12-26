import { useState } from "react";
import styles from "@/styles/border.module.css";
import { CloseIcon, InformationIcon, TickCircle } from "@/components/icons";
import Button from "@/components/dashboard/Button";

import { useRouter } from "next/navigation";

import useDeleteReport from "@/hooks/useDeleteReport";
import axios from "axios";
import { getToken } from "@/utils/token";

export default function Delete({ redirect }: { redirect: string }) {
  const { isActive, setIsActive, setRefetch } = useDeleteReport();

  const router = useRouter();
  return (
    <div
      className={`${
        isActive !== "" ? "flex" : "hidden"
      } inset-0 rounded-[8px] fixed justify-center items-center    bg-black/60 z-30`}
    >
      <div
        className={`${styles.border_driver} rounded-[16px] relative py-12  gap-3  w-[35%] flex flex-col justify-center items-center bg-primary`}
      >
        <InformationIcon />
        <div
          onClick={() => setIsActive("")}
          className="absolute cursor-pointer top-5 right-5"
        >
          <CloseIcon />
        </div>
        <div className="max-w-[80%] relative">
          <h1 className="text-white text-2.5xl font-bold text-center">
            Delete Report?
          </h1>
          <p className="text-grey mt-3 relative  text-center">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => {
              setIsActive("");
            }}
            className="border relative border-secondary bg-transparent text-secondary rounded-[30px] py-3 px-7 "
          >
            Cancel
          </button>
          <button
            className=" bg-danger relative text-white rounded-[30px] py-3 px-7 "
            onClick={async () => {
              try {
                console.log(isActive);
                await axios.post(`/api/reports/${isActive}/delete`, null, {
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                  },
                });

                setIsActive("");
                setRefetch();
                router.push(redirect);
              } catch (err) {
                console.log(err);
                setIsActive("");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
