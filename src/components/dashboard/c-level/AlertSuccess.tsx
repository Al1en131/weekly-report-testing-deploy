import React from "react";
import { TickIcon } from "@/components/icons";
import styles from "@/styles/border.module.css";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

interface AlertProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function Alert({ title, message, onClose }: AlertProps) {
  return (
    <div
      className={`flex inset-0 rounded-[8px] fixed justify-center items-center    bg-black/60 z-30`}
    >
      <div
        className={`${styles.border_driver} rounded-[16px] relative py-5 md:py-12  gap-3  sm:w-[50%] lg:w-[30%] flex flex-col justify-center items-center bg-primary`}
      >
        <TickIcon />
        <button
          onClick={() => {onClose();}}
          className="text-2xl absolute right-5 top-5"
        >
          <IoClose />
        </button>
        <div className="max-w-[80%] relative">
          <h1 className="text-white text-[20px] sm:text-[28px] leading-[40px] font-bold text-center">
          {title}
          </h1>
          <p className="text-[#FFFFFF8F] mt-1 relative text-sm sm:text-base text-center">
          {message}
          </p>
        </div>
        <Link
          href={`/c-level/division/list-division`}
        >
          <button className="bg-secondary my-2 sm:mt-3 rounded-[30px] cursor-pointer text-[#1B4E6B] relative text-sm sm:text-base font-medium py-2 px-6">
            Oke
          </button>
        </Link>
      </div>
    </div>
  );
}
