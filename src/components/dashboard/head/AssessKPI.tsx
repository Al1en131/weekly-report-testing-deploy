"use client";
import styles from "@/styles/border.module.css";
import Select from "@/components/dashboard/Select";
import scrollbar from "@/styles/scrollbar-custom.module.css";
import useDriver from "@/hooks/useDriver";
import { useState } from "react";
const web = [
  { name: "Web Development", value: "Web Development" },
  { name: "Web Design", value: "Web Design" },
];
export default function AssessKPI() {
  const [menu, setMenu] = useState(web[0].value);
  const { driverObj } = useDriver({ root: "/head/staff-kpi" });
  return (
    <section
      className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
    >
      <div className="flex justify-between items-center relative max-lg:flex-col max-lg:space-y-4 overflow-hidden ">
        <h3 className="text-xl font-bold max-lg:text-lg max-lg:w-full max-lg:text-center">Choose a Division to Assess KPI</h3>
        <div className="flex gap-4 max-lg:flex-col max-lg:w-full">
          <Select
            value={menu}
            setValue={setMenu}
            id={"third-driver-staff-kpi"}
            data={web}
          />

          <button
            id={"fifteenth-driver-staff-kpi"}
            onClick={() => {
              driverObj.drive();
            }}
            className="text-sm rounded-[30px] hover:bg-primary py-3 px-6 font-medium text-secondary border border-secondary"
          >
            Show Tutorial
          </button>
        </div>
      </div>
      <div
        id="second-driver-staff-kpi"
        className={` ${scrollbar.scrollCustom} mt-5 w-full relative rounded-lg pb-4 overflow-x-auto`}
      >
        <table
          className={`${styles.border_table} text-center w-full relative text-sm md:text-base  rounded-lg`}
        >
          <colgroup>
            <col />
            <col id={"fourth-driver-staff-kpi"} />
            <col id={"fifth-driver-staff-kpi"} />
            <col id={"sixth-driver-staff-kpi"} />
            <col id={"seventh-driver-staff-kpi"} />
            <col id={"eigth-driver-staff-kpi"} />
            <col span={2} id={"tenth-driver-staff-kpi"} />
            <col id={"eleventh-driver-staff-kpi"} />
            <col id={"twelvth-driver-staff-kpi"} />
          </colgroup>
          <thead className="font-medium">
            <tr>
              <th className="p-3 border-white/30  border-r  font-medium">
                No.
              </th>
              <th className="p-3 border-white/30  border-x font-medium">
                Aspect
              </th>
              <th className="p-3 border-white/30  text-nowrap border-x font-medium">
                Key Performance Indicator (KPI)
              </th>
              <th className="p-3 font-medium border-white/30  border-x">
                Weight
              </th>
              <th className="p-3 font-medium border-white/30  border-x">
                Target
              </th>
              <th className="p-3 font-medium border-white/30 text-nowrap  border-x">
                End-of-Month Realization
              </th>
              <th className="p-3 font-medium border-white/30  border-x">
                Score
              </th>
              <th className="p-3 font-medium  text-nowrap border-white/30  border-l">
                Final Score
              </th>
              <th className="p-3 font-medium  text-nowrap border-white/30  border-l">
                Total Aspects
              </th>
              <th className="p-3 font-medium  text-nowrap border-white/30  border-l">
                Value Conversion
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary/60 relative  text-white/60">
            {/* row 1 */}
            <tr className="">
              <td
                rowSpan={3}
                className="border-white/30 p-3 border-t border-r text-center  border-collapse"
              >
                1
              </td>
              <td
                id={"fourth-driver-staff-kpi"}
                rowSpan={3}
                className="border-white/30 p-3 border text-start  border-collapse"
              >
                Activeness
              </td>
              <td className="border-white/30 p-3 border text-start  border-collapse">
                Attending HRD Weekly Meeting and Monthly Meeting
              </td>
              <td className="border-white/30 p-3 border  border-collapse">
                10
              </td>
              <td className="border-white/30 p-3 border  border-collapse">
                100%
              </td>
              <td
                id={"ninth-driver-staff-kpi"}
                className="border-white/30 relative   border  border-collapse"
              >
                <input
                  type="text"
                  placeholder="Click to enter the value"
                  className="bg-transparent outline-secondary text-center  absolute inset-0 h-full border-none"
                />
              </td>
              <td className="border-white/30 p-3 border  border-collapse">2</td>
              <td className="border-white/30 p-3 border  border-collapse">0</td>
              <td
                rowSpan={3}
                className="border-white/30 p-3 border  border-collapse"
              >
                0
              </td>
              <td
                rowSpan={3}
                className="border-white/30 p-3 border-l border-y  border-collapse"
              >
                0
              </td>
            </tr>
            <tr>
              <td className="border-white/30 p-3 border text-start  border-collapse">
                Attending CC&apos;s Big Meeting
              </td>
              <td className="border-white/30 p-3 border  border-collapse">
                10
              </td>
              <td className="border-white/30 p-3 border  border-collapse">
                100%
              </td>
              <td className="border-white/30 relative   border  border-collapse">
                <input
                  type="text"
                  placeholder="Click to enter the value"
                  className="bg-transparent outline-secondary  text-center absolute inset-0 h-full border-none"
                />
              </td>
              <td className="border-white/30 p-3 border  border-collapse">2</td>
              <td className="border-white/30 p-3 border-l border-y  border-collapse">
                0
              </td>
            </tr>
            <tr>
              <td className="border-white/30 p-3 border text-start  border-collapse">
                Attending CC Internal Activities
              </td>
              <td className="border-white/30 p-3 border  border-collapse">
                10
              </td>
              <td className="border-white/30 p-3 border  border-collapse">
                100%
              </td>
              <td className="border-white/30 relative   border  border-collapse">
                <input
                  type="text"
                  placeholder="Click to enter the value"
                  className="bg-transparent outline-secondary text-center absolute inset-0 h-full border-none"
                />
              </td>
              <td className="border-white/30 p-3 border  border-collapse">2</td>
              <td className="border-white/30 p-3 border-l border-y  border-collapse">
                0
              </td>
            </tr>
            {/* end row 1 */}
          </tbody>
          <tfoot className="bg-primary/60 relative text-white/60">
            <tr>
              <td
                className="border-white/30 text-start p-3 border-r border-t"
                colSpan={3}
              >
                Grand Total
              </td>
              <td className="border-white/30 p-3 border-t border-x">100</td>
              <td
                colSpan={3}
                className="border-white/30 p-3 border-t border-x"
              ></td>
              <td className="border-white/30 p-3 border-t border-x">10</td>
              <td className="border-white/30 p-3 border-t border-x">10</td>
              <td className="border-white/30 p-3 border-t border-l"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="w-full flex justify-center mt-8 max-lg:mt-4">
        <button
          id={"thirteenth-driver-staff-kpi"}
          className="bg-secondary py-4 px-4 w-full rounded-md md:w-[40%] md:rounded-[30px] text-sm md:text-base text-primary font-semibold overflow-hidden "
        >
          Submit Assessment
        </button>
      </div>
    </section>
  );
}
