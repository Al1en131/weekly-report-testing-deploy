"use client";

import Navbar from "@/components/dashboard/Navbar";
import styles from "@/styles/border.module.css";

export default function DetailDivision() {
  return (
    <main>
      <Navbar title="Division" />
      <section
        className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex">
            <h3 className=" text-xl font-bold">division</h3>
          </div>
        </div>
      </section>
        
    </main>
  );
}
