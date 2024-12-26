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

const weekSelect = getWeekDates(
  new Date().getFullYear(),
  new Date().getMonth()
);

function useRealTime() {
  const [dateTime, setDateTime] = useState({
    day: '',
    date: '',
    month: '',
    year: '',
    time: ''
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dayOptions = { weekday: 'long' };
      const monthOptions = { month: 'long' };

      // setDateTime({
      //   day: new Intl.DateTimeFormat('en-US', dayOptions).format(now),
      //   date: now.getDate(),
      //   month: new Intl.DateTimeFormat('en-US', monthOptions).format(now),
      //   year: now.getFullYear(),
      //   time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      // });
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return dateTime;
}

export default function MyReport() {
  const [week, setWeek] = useState<any[]>(weekSelect[0].value);
  const [month, setMonth] = useState<string>(monthSelect[0].value);
  const [staff, setStaff] = useState<any[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [report, setReport] = useState<any[]>([]);
  const [chooseStaff, setChooseStaff] = useState<string>("");
  const [chooseReport, setChooseReport] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = getToken();

  const { day, date, month: currentMonth, year, time } = useRealTime();

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
        setChooseStaff(result.data.data[0].uuid);
        setStaff(result.data.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getStaff();
  }, [month, token, week]);

  return (
    <div
      id="fourth-driver"
      className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
    >
      <div className="flex justify-between relative">
        <h3 className="text-base md:text-xl font-bold ">Staff List</h3>
        <div className=" flex gap-2 ">
          <Select setValue={setMonth} value={month} data={monthSelect} />
          <Select setValue={setWeek} value={week} data={weekSelect} />
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-6">
        <div className="w-full md:w-[40%] space-y-3" >
          <button className="flex gap-4 border-2 rounded-md hover:bg-[#164159] border-[#164159] cursor-pointer w-full py-2 px-4">
            <Image src="/assets/image/avatar.png" width={45} height={30} className="md:w-[55]" alt="avatar" />
            <div className="text-sm md:text-xl text-start">
              <p>Naruto</p>
              <p className="text-[#777] text-base">Staff</p>
            </div>
          </button>

          <button className="flex gap-4 border-2 rounded-md hover:bg-[#164159] border-[#164159] cursor-pointer w-full py-2 px-4">
            <Image src="/assets/image/avatar.png" width={45} height={30} className="md:w-[55]" alt="avatar" />
            <div className="text-sm md:text-xl text-start">
              <p>Naruto</p>
              <p className="text-[#777] text-base">Staff</p>
            </div>
          </button>

          <button className="flex gap-4 border-2 rounded-md hover:bg-[#164159] border-[#164159] cursor-pointer w-full py-2 px-4">
            <Image src="/assets/image/avatar.png" width={45} height={30} className="md:w-[55]" alt="avatar" />
            <div className="text-sm md:text-xl text-start">
              <p>Naruto</p>
              <p className="text-[#777] text-base">Staff</p>
            </div>
          </button>
        </div>
        <div className="hidden md:block w-[60%] space-y-3">
          <div className="bg-[#164159] space-y-4 p-4 rounded-md">
            <div>
              <p>Friday</p>
              <p>7 May 2022</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-[15%]">
                <Image src="/assets/image/Picture.png" width={100} height={100} alt="Picture" />
              </div>
              <div className="w-[85%]">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias neque commodi quia dolorem reiciendis eos, id facere, dicta adipisci ex voluptate quos.
                </p>
                <p className="text-[#ffDE59] font-semibold">
                  Show more
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#164159] space-y-4 p-4 rounded-md">
            <div>
              <p>Friday</p>
              <p>7 May 2022</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-[15%]">
                <Image src="/assets/image/Picture.png" width={100} height={100} alt="Picture" />
              </div>
              <div className="w-[85%]">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias neque commodi quia dolorem reiciendis eos, id facere, dicta adipisci ex voluptate quos.
                </p>
                <p className="text-[#ffDE59] font-semibold">
                  Show more
                </p>
              </div>
            </div>
          </div>


          <div className="bg-[#164159] space-y-4 p-4 rounded-md">
            <div>
              <p>Friday</p>
              <p>7 May 2022</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-[15%]">
                <Image src="/assets/image/Picture.png" width={100} height={100} alt="Picture" />
              </div>
              <div className="w-[85%]">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias neque commodi quia dolorem reiciendis eos, id facere, dicta adipisci ex voluptate quos.
                </p>
                <p className="text-[#ffDE59] font-semibold">
                  Show more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
