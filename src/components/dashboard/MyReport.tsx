import styles from "@/styles/border.module.css";
import { EditIcon, TasksIcon, TrashIcon } from "../icons";
import Image from "next/image";
import Link from "next/link";
import Select from "./Select";
import { format, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import { getWeekDates } from "@/utils/getWeekDates";
import useDeleteReport from "@/hooks/useDeleteReport";
import { getToken } from "@/utils/token";

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

export default function MyReport({ root }: { root: string }) {
  const {
    setIsActive: setIsActiveDelete,
    isActive,
    refetch,
  } = useDeleteReport();
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [week, setWeek] = useState<any[]>(weekSelect[0].value);
  const [month, setMonth] = useState(monthSelect[0].value);
  const [report, setReport] = useState<any[]>([]);
  const [reportFilter, setReportFilter] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getReport = async () => {
      try {
        const report = await axios.get("/api/reports", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        setReport(report.data.data.self);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getReport();
  }, [refetch]);

  useEffect(() => {
    const result = report?.filter((value, i) => {
      return (
        format(new Date(Date.parse(value.created_at)), "MMM").toLowerCase() ==
          month &&
        week.includes(format(new Date(Date.parse(value.created_at)), "dd"))
      );
    });
    setReportFilter(result);
  }, [month, week, report]);
  return (
    <section
      id="fourth-driver"
      className={`${styles.border_section}   overflow-y-hidden   relative rounded-[8px]  p-5 bg-[#0D2735]`}
    >
      <div className="flex max-lg:space-y-3 max-lg:block md:justify-between relative">
        <h4>My Weekly Report</h4>
        <div className="flex gap-4 relative max-lg:pt-4">
          <Select setValue={setMonth} value={month} data={monthSelect} />
          <Select setValue={setWeek} value={week} data={weekSelect} />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-6 overflow-y-auto relative rm-scroll h-[420px]">
        {/* article can edit */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {reportFilter?.length > 0 ? (
              reportFilter.map((value, i) => {
                return (
                  <article key={i} className="bg-[#164159] p-4 rounded-[4px]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm text-grey">
                          {format(Date.parse(value.created_at), "EEEE")}
                        </h4>
                        <h5 className="font-semibold text-white text-base">
                          {format(Date.parse(value.created_at), "dd MMM yyyy")}
                        </h5>
                      </div>

                      {isBefore(
                        Date.now() - 24 * 60 * 60 * 1000,
                        Date.parse(value.created_at)
                      ) && (
                        <div className="flex gap-2 items-center">
                          <button className="bg-secondary rounded-[4px] p-1">
                            <Link
                              href={`${root}/weekly-report/edit/${value.uuid}`}
                            >
                              <EditIcon />
                            </Link>
                          </button>
                          <button
                            onClick={() => {
                              setIsActiveDelete(value.uuid as string);
                            }}
                            className="bg-danger relative rounded-[4px] p-1"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      )}
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
                            <div
                              className="font-light text-xs text-grey"
                              dangerouslySetInnerHTML={{
                                __html: showMore
                                  ? value.report
                                  : value.report.slice(0, 200),
                              }}
                            />
                            {value.report.length > 200 && (
                              <button
                                className="text-secondary text-xs font-medium"
                                onClick={() => setShowMore((v) => !v)}
                              >
                                {showMore ? "Show Less" : "Show More"}
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div>
                          <div
                            className="font-light text-xs text-grey"
                            dangerouslySetInnerHTML={{
                              __html: showMore
                                ? value.report
                                : value.report.slice(0, 200),
                            }}
                          />
                          {value.report.length > 200 && (
                            <button
                              className="text-secondary text-xs font-medium"
                              onClick={() => setShowMore((v) => !v)}
                            >
                              {showMore ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="absolute inset-0 flex-col gap-5 flex justify-center items-center">
                <TasksIcon />
                <p className="text-grey max-lg:text-center">
                  You have not submitted any report in this period.
                </p>
              </div>
            )}
          </>
        )}
        {/* {new Array(5).fill(0).map((_, idx) => {
          return (
            <article key={idx} className="bg-[#164159] p-4 rounded-[4px]">
              <div>
                <h4 className="text-sm text-grey">Wednesday</h4>
                <h5 className="font-semibold text-white text-base">
                  5 Jun 2024
                </h5>
              </div>
              <div className="mt-3">
                <p className="font-light text-xs text-grey">
                  Hari ini saya sudah menulis 8000 baris kode, menyelesaikan 12
                  tasks yang diberikan, dan juga mempelajari lebih lanjut
                  mengenai tugas yang kemarin sempat diberikan. Saya rencananya
                  besok akan melanjutkan menulis 16000 baris kode lagi dan
                  menyelesaikan semua task untuk sprint ini.
                </p>
                <Link href={"/"} className="text-secondary text-xs font-medium">
                  Show More
                </Link>
              </div>
            </article>
          );
        })} */}
      </div>
    </section>
  );
}
