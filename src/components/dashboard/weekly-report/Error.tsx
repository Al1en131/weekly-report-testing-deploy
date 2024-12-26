import { useState } from "react";
import styles from "@/styles/border.module.css";
import { CloseIcon, InformationIcon, TickCircle } from "@/components/icons";
import Button from "@/components/dashboard/Button";

import { useRouter } from "next/navigation";

import useDeleteReport from "@/hooks/useDeleteReport";
import axios from "axios";
import { getToken } from "@/utils/token";
import useError from "@/hooks/useError";

export default function Error({ redirect }: { redirect: string }) {
  const { isActive, setIsActive } = useError();

  const router = useRouter();
  return (
    <div
      className={`${
        isActive.length ? "flex" : "hidden"
      } inset-0 rounded-[8px] fixed justify-center items-center    bg-black/60 z-30`}
    >
      <div
        className={`${styles.border_driver} rounded-[16px] relative py-12  gap-3  w-[35%] flex flex-col justify-center items-center bg-primary`}
      >
        <InformationIcon />
        <div
          onClick={() => {
            router.push(redirect);
            setIsActive([]);
          }}
          className="absolute cursor-pointer top-5 right-5"
        >
          <CloseIcon />
        </div>
        <div className="max-w-[80%] relative">
          <h1 className="text-white text-2.5xl font-bold text-center">
            {isActive[0]?.title}
          </h1>
          <p className="text-grey mt-3 relative  text-center">
            {isActive[0]?.message}
          </p>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => {
              router.push(redirect);
              setIsActive([]);
            }}
            className="relative   bg-secondary text-primary rounded-[30px] py-3 px-7 "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
