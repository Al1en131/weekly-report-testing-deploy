import Navbar from "@/components/dashboard/Navbar";
import styles from "@/styles/border.module.css";
import React from "react";
import AssessAddKPI from "@/components/dashboard/head/AssessAddKPI";

export default function KpiPage() {
  return (
    <main>
      <Navbar title="Add Division KPI" />
      <AssessAddKPI />
      <section
        id="ninth-driver-division-head-kpi"
        className={`${styles.border_section} w-full overflow-x-auto p-7 bg-[#0D2735] mt-5 rounded-lg flex flex-col`}
      >
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Explanations
        </h3>
        <div className="flex mt-4 flex-col">
          <div className="w-full overflow-x-auto bg-primary p-3 flex-1 rounded">
            <h4 className="font-bold">Calculation Formula</h4>
            <div className="text-xs mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-[120px_minmax(150%,_1fr)] gap-4">
                <h5 className="text-secondary">Division KPI:</h5>
                <p className="text-grey">
                  Programs and initiatives carried out by the division within a
                  month to achieve the set Key Performance Indicators (KPIs).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_minmax(150%,_1fr)] gap-4">
                <h5 className="text-secondary">KPI Weight:</h5>
                <p className="text-grey">
                  The KPI weight for each aspect is different depending on
                  priority; if added up, it must be 100.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_minmax(150%,_1fr)] gap-2 md:gap-4">
                <h5 className="text-secondary">Target:</h5>
                <p className="text-grey">
                  Achievements to be achieved in a month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
