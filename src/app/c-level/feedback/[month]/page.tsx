"use client";

import "driver.js/dist/driver.css";
import styles from "@/styles/border.module.css";

import Navbar from "@/components/dashboard/Navbar";

import Select from "@/components/dashboard/Select";
import { staffreport } from "@/data/dummy";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/token";
import { useParams } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import useSuccess from "@/hooks/useSuccess";
import useError from "@/hooks/useError";
import { TasksIcon } from "@/components/icons";
const web = [
  { name: "Web Development", value: "Web Development" },
  { name: "Web Design", value: "Web Design" },
];

export default function MyStaffReportPage() {
  const [menu, setMenu] = useState<string>(web[0].value);
  const [staff, setStaff] = useState<any[]>([]);
  const [chooseStaff, setChooseStaff] = useState<string>("");
  const [report, setReport] = useState<any[]>([]);
  const params = useParams();

  const [chooseFeedback, setChooseFeedback] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsActive } = useSuccess();
  const { setIsActive: setError } = useError();
  const token = getToken();

  useEffect(() => {
    const result = report?.filter((value, i) => {
      return value.user.uuid == chooseStaff;
    });
    setChooseFeedback(result);
  }, [report, chooseStaff]);

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

        setChooseFeedback(filterReports);
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
  }, [token]);

  useEffect(() => {
    const getStaff = async () => {
      setIsLoading(true);
      if (params) {
        console.log(format(Date.now(), "MMMM").toLowerCase(), params.month);
        if (format(Date.now(), "MMMM").toLowerCase() !== params.month) {
          return setError([
            {
              title: "Can’t See All Feedback",
              message: "It's not time to view in this feedback yet.",
            },
          ]);
        }
      }
      try {
        const result = await axios.get("/api/authz/groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const divisions: any[] = result.data.data;
        const staff: any[] = [];
        divisions.forEach(({ members }: { members: any[] }) => {
          members.forEach((value) => {
            staff.push(value);
          });
        });
        console.log(staff);
        setStaff(staff);
        setChooseStaff(staff[0].uuid);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getStaff();
  }, [params, token, setError]);
  return (
    <main>
      <Navbar title="See All Feedback" />
      <section
        className={`${styles.border_section} w-full p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        <div className="space-y-3 md:flex justify-between relative">
          <div>
            <h3 className="text-xl font-bold">Staff List</h3>
          </div>
          <div>
            <Select value={menu} setValue={setMenu} data={web} />
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
                    key={index}
                    onClick={() => setChooseStaff(v.uuid)}
                    className={`flex gap-3 border-2 relative items-center ${
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
                {chooseFeedback?.length > 0 ? (
                  chooseFeedback.map((value, i) => {
                    return (
                      <article
                        key={i}
                        className="bg-[#164159] p-4 rounded-[4px]"
                      >
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
    </main>
  );
}
