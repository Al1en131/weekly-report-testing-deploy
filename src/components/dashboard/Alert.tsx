import { useEffect, useState } from "react";
import styles from "@/styles/border.module.css";
import { EmojiHappy } from "@/components/icons";
import Button from "@/components/dashboard/Button";

import { useRouter } from "next/navigation";
import useDriver from "@/hooks/useDriver";

export default function Alert({ root }: { root: string }) {
  const [isActive, setIsActive] = useState<boolean>(true);
  const { driverObj } = useDriver({ root });

  const router = useRouter();
  return (
    <div
      className={`${
        isActive ? "flex" : "hidden"
      } inset-0 rounded-[8px] fixed justify-center items-center    bg-black/60 z-30`}
    >
      <div
        className={`${styles.border_driver} rounded-[16px] relative py-12  gap-3  w-[35%] flex flex-col justify-center items-center bg-primary max-lg:w-[75%]`}
      >
        <EmojiHappy />
        <div className="max-w-[80%] relative">
          <h1 className="text-white text-2.5xl font-bold text-center max-lg: text-xl">
            Welcome to Candidate College Weekly Report
          </h1>
          <p className="text-grey mt-3 relative  text-center">
            Let&apos;s take a tour to learn about how to use this website.
          </p>
        </div>
        <Button
          onClick={() => {
            setIsActive(false);
            router.push(root);
            setTimeout(function () {
              driverObj.drive();
            }, 100);
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
