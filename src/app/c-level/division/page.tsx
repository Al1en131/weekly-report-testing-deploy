"use client";

import Navbar from "@/components/dashboard/Navbar";
import styles from "@/styles/border.module.css";
import { FaPlus } from "react-icons/fa";
import Link from "next/link"; // Import Link from next/link
import ListDivision from "@/components/dashboard/c-level/ListDivision";

export default function DashboardDevision() {
  return (
    <main>
      <Navbar title="Division" />
      <section
        className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex">
            <h3 className=" text-xl font-bold">List Division</h3>
          </div>
          <div className="flex">
            <Link href="/add-division">
              {" "}
              {/* Provide the correct URL */}
              <button className="flex text-sm max-lg:text-xs font-medium gap-2 text-[#0D2735] bg-secondary rounded-[30px] border max-lg:px-2 py-2 px-6 border-secondary items-center">
                Add Division <FaPlus />
              </button>
            </Link>
          </div>
        </div>
        <ListDivision />
      </section>
        
    </main>
  );
}
