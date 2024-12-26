"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function ConstructPage() {
  const router = useRouter();

  return (
    <div className="bg-primary gap-6 flex-col flex justify-center items-center h-screen">
      <Image
        alt="coycoy"
        height={100}
        width={100}
        src={"/assets/image/Chats.png"}
        className="w-[30%]"
      />
      <button
      onClick={() => router.back()}
       className="bg-secondary  rounded-[30px] px-8 py-4  text-primary font-semibold">
        Back to Previous Page
      </button>
    </div>
  );
}



