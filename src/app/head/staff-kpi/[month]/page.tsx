import Navbar from "@/components/dashboard/Navbar";
import AssessKPI from "@/components/dashboard/head/AssessKPI";
import styles from "@/styles/border.module.css";
import aspectRange from "@/data/aspect-range";
import React from "react";

export default function KpiPage() {
  return (
    <main>
      <Navbar title="Assess Division KPI" />
      <AssessKPI />
      <section
        id={"fourteenth-driver-staff-kpi"}
        className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        <h3 className="text-xl font-bold max-lg:overflow-hidden ">
          Explanations
        </h3>
        <div className="mt-4 flex gap-4 max-lg:flex-col overflow-hidden ">
          <div className="bg-primary p-3 rounded w-1/3 max-lg:w-full  ">
            <h4 className="font-bold max-lg:text-center">Range</h4>
            <div className="md:w-[50%] text-xs mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-[100%_minmax(150%,_1fr)] max-lg:flex max-lg:justify-between">
                <h5 className="text-secondary">96 - 100</h5>
                <p className="text-grey">Excellent</p>
              </div>
              <div className="grid grid-cols-[100%_minmax(150%,_1fr)] max-lg:flex max-lg:justify-between">
                <h5 className="text-secondary">86 - 95</h5>
                <p className="text-grey">Very Good</p>
              </div>
              <div className="grid grid-cols-[100%_minmax(150%,_1fr)] max-lg:flex max-lg:justify-between">
                <h5 className="text-secondary">76 - 85</h5>
                <p className="text-grey">Good</p>
              </div>
              <div className="grid grid-cols-[100%_minmax(150%,_1fr)] max-lg:flex max-lg:justify-between">
                <h5 className="text-secondary">66 - 75</h5>
                <p className="text-grey">Average</p>
              </div>
              <div className="grid grid-cols-[100%_minmax(150%,_1fr)] max-lg:flex max-lg:justify-between">
                <h5 className="text-secondary">56 - 65</h5>
                <p className="text-grey">Fair</p>
              </div>
              <div className="grid grid-cols-[100%_minmax(150%,_1fr)] max-lg:flex max-lg:justify-between">
                <h5 className="text-secondary">36 - 55</h5>
                <p className="text-grey">Poor</p>
              </div>
              <div className="grid grid-cols-[100%_minmax(150%,_1fr)] max-lg:flex max-lg:justify-between">
                <h5 className="text-secondary">0 - 35</h5>
                <p className="text-grey">Very Poor</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col max-lg:w-full">
            <div className="bg-primary p-3 flex-1 rounded">
              <h4 className="font-bold max-lg:text-center">
                Calculation Formula
              </h4>
              <div className="w-[50%] text-xs mt-4 flex flex-col gap-3 max-lg:w-full">
                <div className="grid grid-cols-[40%_minmax(150%,_1fr)] max-lg:flex flex-col">
                  <h5 className="text-secondary">Score:</h5>
                  <p className="text-grey">
                    End-of-Month Realization / Target x 100
                  </p>
                </div>
                <div className="grid grid-cols-[40%_minmax(150%,_1fr)] max-lg:flex flex-col">
                  <h5 className="text-secondary">Final Score:</h5>
                  <p className="text-grey">Score x KPI Weight / 100</p>
                </div>
              </div>
            </div>
            <div className="bg-primary p-3 flex-1 rounded mt-4 max-lg:w-full  ">
              <h4 className="font-bold max-lg:text-center">Explanations</h4>
              <div className="w-[50%] text-xs mt-4 flex flex-col gap-3 max-lg:w-full">
                <div className="grid grid-cols-[40%_minmax(150%,_1fr)] max-lg:flex flex-col ">
                  <h5 className="text-secondary">KPI Weight:</h5>
                  <p className="text-grey">
                    The KPI weight for each aspect is different depending on
                    priority; if added up, it must be 100.
                  </p>
                </div>
                <div className="grid grid-cols-[40%_minmax(150%,_1fr)] max-lg:flex flex-col">
                  <h5 className="text-secondary">Target:</h5>
                  <p className="text-grey ">
                    Achievements to be achieved in a month.
                  </p>
                </div>
                <div className="grid grid-cols-[40%_minmax(150%,_1fr)] max-lg:flex flex-col">
                  <h5 className="text-secondary">End-of-Month Realization:</h5>
                  <p className="text-grey ">
                    Realization of the work carried out within a month.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary p-3 rounded w-full md:w-1/2 overflow-hidden">
            <h4 className="font-bold max-lg:text-center">Aspect Range</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-y-5 lg:grid-cols-[40%_40%] w-full lg:w-[80%] ">
              {aspectRange.map((value, i) => {
                return (
                  <div className=" text-center lg:text-left" key={i}>
                    <h4 className="text-sm font-medium">{value.title}</h4>
                    <div className="w-full grid grid-cols-2 gap-y-2 mt-3">
                      {value.data.map((value, i) => {
                        return (
                          <React.Fragment key={i}>
                            <p className="text-secondary font-medium text-xs">
                              {value.range}
                            </p>
                            <p className="text-grey text-xs">{value.score}</p>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
