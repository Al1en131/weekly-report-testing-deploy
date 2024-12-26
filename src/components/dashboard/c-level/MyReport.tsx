"use client";

import "driver.js/dist/driver.css";
import styles from "@/styles/border.module.css";

import Navbar from "@/components/dashboard/Navbar";

import Select from "@/components/dashboard/Select";
import { staffreport } from "@/data/dummy";
import Image from "next/image";
import Link from "next/link";
import { getWeekDates } from "@/utils/getWeekDates";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/token";
import axios from "axios";
import { TasksIcon } from "@/components/icons";
import { format } from "date-fns";
const monthSelect = [
  { name: "Jun", value: "jun" },
  { name: "Jul", value: "jul" },
  { name: "Aug", value: "aug" },
  { name: "Sep", value: "sep" },
];
const webSelect = [
  { name: "Web Development", value: "Web Development" },
  {
    name: "Web Design",
    value: "Web Design",
  },
];
const weekSelect = getWeekDates(
  new Date().getFullYear(),
  new Date().getMonth()
);
export default function MyReport() {
  const [week, setWeek] = useState<any[]>(weekSelect[0].value);
  const [menu, setMenu] = useState<string>(webSelect[0].value);
  const [month, setMonth] = useState<string>(monthSelect[0].value);
  const [staff, setStaff] = useState<any[]>([]);
  const [report, setReport] = useState<any[]>([]);
  const [chooseStaff, setChooseStaff] = useState<string>("");
  const [chooseReport, setChooseReport] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = getToken();

  useEffect(() => {
    const result = report?.filter((value, i) => {
      return (
        format(new Date(Date.parse(value.created_at)), "MMM").toLowerCase() ==
          month &&
        week.includes(format(new Date(Date.parse(value.created_at)), "dd")) &&
        value.user.uuid == chooseStaff
      );
    });
    setChooseReport(result);
  }, [month, week, report, chooseStaff]);

  useEffect(() => {
    const getStaff = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get("/api/authz/groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const reportFetch = await axios.get("/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(report);
        const reports: any[] = reportFetch?.data?.data?.others;
        setReport(reportFetch?.data?.data?.others);
        const filterReports = reports.filter((value) => {
          return value.user.uuid == result.data.data[0].uuid;
        });
        const filterReportDate = filterReports?.filter((value, i) => {
          return (
            format(
              new Date(Date.parse(value.created_at)),
              "MMM"
            ).toLowerCase() == month &&
            week.includes(format(new Date(Date.parse(value.created_at)), "dd"))
          );
        });
        setChooseReport(filterReportDate);
        const divisions: any[] = result.data.data;
        const staff: any[] = [];
        divisions.forEach(({ members }: { members: any[] }) => {
          members.forEach((value) => {
            staff.push(value);
          });
        });

        setStaff(staff);
        setChooseStaff(staff[0].uuid);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getStaff();
  }, [month, week, report, chooseStaff, token]);

  return (
    <section
      id="fourth-driver"
      className={`${styles.border_section} p-7 max-lg:px-3 bg-[#0D2735] mt-5 rounded-lg`}
    >
      <div className="flex max-lg:block max-lg:justify-center max-lg:space-y-4 justify-between relative">
        <h3 className="text-xl font-bold">My Staff Report</h3>
        <div className="flex gap-2">
          <Select value={menu} setValue={setMenu} data={webSelect} />
          <Select setValue={setMonth} value={month} data={monthSelect} />
          <Select setValue={setWeek} value={week} data={weekSelect} />
        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <div id="ten-driver" className="w-4/12 h-fit flex flex-col gap-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            staff?.map((v, index) => {
              return (
                <div
                  onClick={() => setChooseStaff(v.uuid)}
                  key={index}
                  className={`relative flex gap-3 border-2 items-center ${
                    v.uuid == chooseStaff && "bg-[#164159]"
                  } border-[#164159] rounded-[4px] py-3 px-4`}
                >
                  <Image
                    src={"/assets/image/Avatar.png"}
                    className="w-[44px] aspect-square rounded-full"
                    alt="Staff Profile"
                    height={100}
                    width={100}
                  />
                  <div className="flex flex-col gap-[2px]">
                    <span className="font-medium text-sm">{v.name}</span>
                    <span className="text-[10px] text-grey">{v.jab}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="flex flex-col flex-1 gap-3 max-h-[600px] relative overflow-auto rm-scroll">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {chooseReport?.length > 0 ? (
                chooseReport.map((value, i) => {
                  return (
                    <article key={i} className="bg-[#164159] p-4 rounded-[4px]">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm text-grey">
                            {format(Date.parse(value.created_at), "EEEE")}
                          </h4>
                          <h5 className="font-semibold text-white text-base">
                            {format(
                              Date.parse(value.created_at),
                              "dd MMM yyyy"
                            )}
                          </h5>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-3">
                        {value.image ? (
                          <>
                            <div className="w-2/12">
                              <Image
                                height={100}
                                width={100}
                                className="w-full object-cover rounded-[4px]"
                                alt="Image Article"
                                src={`/upload/${value.image}`}
                              />
                            </div>
                            <div className="w-10/12">
                              <p className="font-light text-xs text-grey">
                                {value.report}
                              </p>
                              <Link
                                href={"/"}
                                className="text-secondary text-xs font-medium"
                              >
                                Show More
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div>
                            <p className="font-light text-xs text-grey">
                              {value.report}
                            </p>
                            <Link
                              href={"/"}
                              className="text-secondary text-xs font-medium"
                            >
                              Show More
                            </Link>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="absolute inset-0 flex-col gap-5 flex justify-center items-center">
                  <TasksIcon />
                  <p className="text-grey">
                    You have not submitted any report in this period.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
