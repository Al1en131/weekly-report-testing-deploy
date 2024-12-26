"use client";
import styles from "@/styles/border.module.css";

import scrollbar from "@/styles/scrollbar-custom.module.css";
import useDriver from "@/hooks/useDriver";
import { AddCircleIcon, TrashIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import useStartAddKpi from "@/hooks/useStartAddKpi";
import useKPI from "@/hooks/useKPI";
export default function AssessAddKPI() {
  // const [kpi, setKpi] = useState<any[]>([]);
  const { kpi, setKpi } = useKPI();
  const { driverObj } = useDriver({ root: "/head/division-kpi/add" });
  const { isActive, setIsActive } = useStartAddKpi();

  const handleAddRow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setKpi((prev) => {
      return [...prev, { kpi: "", weight: "", target: "" }];
    });
  };

  return (
    <section
      className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
    >
      <div className="w-full overflow-hidden flex flex-col md:flex-row gap-4 md:gap-0 justify-center md:justify-between relative">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">Choose a Division to Assess KPI</h3>

        <button
          id="tenth-driver-division-head-kpi"
          onClick={() => {
            setIsActive(true);
            driverObj.drive();
          }}
          className="text-sm rounded-[30px] hover:bg-primary py-2 px-6 font-medium text-secondary border border-secondary"
        >
          Show Tutorial
        </button>
      </div>
      <div
        id="second-driver-division-head-kpi"
        className={` ${scrollbar.scrollCustom} mt-5 w-full relative rounded-lg overflow-x-auto`}
      >
        <table
          className={`${styles.border_table} w-full relative text-center rounded-lg text-sm md:text-base`}
        >
          <colgroup>
            <col />
            <col id="third-driver-division-head-kpi" />
            <col id="fourth-driver-division-head-kpi" />
            <col id="fifth-driver-division-head-kpi" />
          </colgroup>
          <thead className="font-medium">
            <tr>
              <th className="p-3 border-white/30  border-r font-medium">No.</th>
              <th className="p-3 border-white/30  border-x font-medium">
                Key Performance Indicator (KPI)
              </th>
              <th className="p-3 font-medium border-white/30  border-x">
                Weight
              </th>
              <th className="p-3 font-medium border-white/30  border-x">
                Target
              </th>

              <th className="p-3 font-medium border-white/30  border-l">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary/60 relative  text-white">
            {!isActive ? (
              kpi.length > 0 ? (
                <>
                  {kpi.map((value, i) => {
                    return (
                      <tr key={i} className="">
                        <td className="border-white/30 p-3 border-r text-center border-collapse">
                          {i + 1}
                        </td>
                        <td className="border-white/30 relative p-3 border-x text-center border-collapse">
                          <input
                            onChange={(e) =>
                              setKpi((prev) => {
                                prev[i].kpi = e.target.value;
                                return [...prev];
                              })
                            }
                            value={value.kpi}
                            type="text"
                            placeholder="Click to enter the value"
                            className="bg-transparent outline-secondary text-center  absolute inset-0 h-full border-none"
                          />
                        </td>

                        <td className="border-white/30 relative   border-x text-center border-collapse">
                          <input
                            onChange={(e) =>
                              setKpi((prev) => {
                                prev[i].weight = e.target.value;
                                return [...prev];
                              })
                            }
                            value={value.weight}
                            type="text"
                            placeholder="0"
                            className="bg-transparent outline-secondary text-center  absolute inset-0 h-full border-none"
                          />
                        </td>
                        <td className="border-white/30 relative p-3 border-x text-center border-collapse">
                          <input
                            onChange={(e) =>
                              setKpi((prev) => {
                                prev[i].target = e.target.value;
                                return [...prev];
                              })
                            }
                            value={value.target}
                            type="text"
                            placeholder="0"
                            className="bg-transparent outline-secondary text-center  absolute inset-0 h-full border-none"
                          />
                        </td>
                        <td className="border-white/30 p-3 border-l text-center border-collapse">
                          <button
                            id="seventh-driver-division-head-kpi"
                            onClick={() => {
                              const arr = [...kpi];
                              arr.splice(i, 1);
                              setKpi((prev) => arr);
                            }}
                            className="bg-danger rounded-[4px] p-1"
                          >
                            <TrashIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr className="">
                  <td className="border-white/30 p-3 border-r text-center border-collapse">
                    1
                  </td>
                  <td className="border-white/30 relative p-3 border-x text-center border-collapse"></td>

                  <td className="border-white/30 relative   border-x text-center border-collapse"></td>
                  <td className="border-white/30 relative p-3 border-x text-center border-collapse"></td>
                  <td className="border-white/30 p-3 border-l text-center border-collapse"></td>
                </tr>
              )
            ) : (
              <tr className="">
                <td className="border-white/30 p-3 border-r text-center border-collapse">
                  1
                </td>
                <td className="border-white/30 relative p-3 border-x text-center border-collapse"></td>

                <td className="border-white/30 relative   border-x text-center border-collapse"></td>
                <td className="border-white/30 relative p-3 border-x text-center border-collapse"></td>
                <td className="border-white/30 p-3 border-l text-center border-collapse"></td>
              </tr>
            )}
          </tbody>
          {!isActive && kpi.length > 0 && (
            <tfoot className="bg-primary/60 relative text-white/60">
              <tr>
                <td
                  className="border-white/30 text-start p-3 border-r border-t"
                  colSpan={2}
                >
                  Grand Total
                </td>
                <td className="border-white/30 p-3 border-t border-x">100</td>
                <td
                  colSpan={3}
                  className="border-white/30 p-3 border-t border-x"
                ></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div className="w-full mt-3 relative overflow-hidden">
        <button
          id="sixth-driver-division-head-kpi"
          onClick={handleAddRow}
          className="bg-secondary group px-6 relative flex gap-1 items-center py-2 rounded-[30px] text-sm text-primary font-medium"
        >
          Add Row <AddCircleIcon />
        </button>
      </div>
      <div className="w-full flex justify-center mt-8">
        <button
          id="eigth-driver-division-head-kpi"
          className="bg-secondary py-4 px-4 w-full rounded-md md:w-[40%] md:rounded-[30px] text-sm md:text-base text-primary font-semibold overflow-hidden"
        >
          Submit Assessment
        </button>
      </div>
    </section>
  );
}
