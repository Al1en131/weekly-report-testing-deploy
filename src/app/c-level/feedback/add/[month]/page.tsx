"use client";

import "driver.js/dist/driver.css";
import styles from "@/styles/border.module.css";
import Navbar from "@/components/dashboard/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getToken } from "@/utils/token";
import axios from "axios";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import useError from "@/hooks/useError";
import useSuccess from "@/hooks/useSuccess";
import apiClient from "@/utils/apiCLient";

export default function AddFeedbackPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [chooseStaff, setChooseStaff] = useState<string>("");
  const params = useParams();
  const [isFilled, setIsFilled] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>("");
  const [chooseFeedback, setChooseFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsActive } = useSuccess();
  const { setIsActive: setError } = useError();
  const token = getToken();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const formData = new FormData();
      console.log(chooseStaff, "WWEE");
      formData.append("user_uuid", chooseStaff);
      formData.append("feedback", feedback);
      const res = await axios.post(`${apiClient.defaults.baseURL}/api/v1/kpi/supervisor-division/2024/5`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data posted:", res.data);

      setIsActive([
        {
          title: "Feedback Submitted!",
          message: "You have submitted this month Feedback",
        },
      ]);
      console.log(res);
    } catch (err) {
      setError([
        { title: "Failed fill in feedback", message: "Try again soon" },
      ]);
      console.log(err);
    }
  };

  useEffect(() => {
    const getFeedback = async () => {
      setFeedback("");
      setIsLoading(true);
      try {
        const result = await axios.get("/api/performance/feedbacks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChooseFeedback(result.data.data.others);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getFeedback();
  }, [token]);

  useEffect(() => {
    setFeedback("");
    const resultFeedback: any[] = chooseFeedback;
    const resultFilterFeedback = resultFeedback.filter((value) => {
      return (
        value.to.uuid == chooseStaff &&
        format(new Date(value.created_at), "MMMM").toString().toLowerCase() ==
        params.month
      );
    });
    if (resultFilterFeedback.length) {
      setIsFilled(true);
      setFeedback(resultFilterFeedback[0]?.feedback);
    } else {
      setIsFilled(false);
    }
  }, [chooseFeedback, chooseStaff, params.month]);

  useEffect(() => {
    const getStaff = async () => {
      setIsLoading(true);
      if (params) {
        if (format(Date.now(), "MMMM").toLowerCase() !== params.month) {
          return setError([
            {
              title: "Can’t Add Feedback",
              message: "It's not time to fill in this feedback yet.",
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
  }, [params, token, params.month, setError]);

  
  return (
    <main>
      <Navbar title="Add Feedback" />
      <section
        className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        <div className="flex justify-between relative">
          <h3 className="text-xl font-bold">Choose Staff</h3>
          <h4 className="font-bold text-xl max-lg:hidden">
            {params.month.at(0)?.toUpperCase()}
            {params.month.slice(1)} 2024
          </h4>
        </div>
        <div className="flex max-lg:block mt-5 gap-5">
          <div className="w-4/12 max-lg:w-full flex flex-col gap-3">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              staff?.map((v, index) => {
                return (
                  <div
                    key={index}
                    className={`flex gap-3 relative border-2 items-center ${chooseStaff == v.uuid && "bg-[#164159]"
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

                    {/* Tombol/Link untuk mobile */}
                    <a
                      href={`/feedback/add/${v.uuid}`}
                      className="block lg:hidden ml-auto text-blue-500 font-medium"
                    >
                      Select
                    </a>

                    {/* Klik langsung untuk desktop */}
                    <div
                      onClick={() => {
                        if (window.innerWidth >= 1024) setChooseStaff(v.uuid);
                      }}
                      className="hidden lg:block absolute inset-0"
                    ></div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex flex-col flex-1 max-lg:hidden gap-3 max-h-[600px] relative overflow-auto rm-scroll">
            <div className="w-full relative">
              <label
                className="text-white font-medium block"
                htmlFor={"twelve-driver"}
              >
                Your Feedback <span className="text-danger">*</span>
              </label>
              <textarea
                disabled={isFilled}
                placeholder="How is this person’s performance this month?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                id={"sixth-driver"}
                rows={8}
                className="text-white outline-none text-sm mt-2 w-full  px-[18px] py-4 border rounded-[4px] bg-transparent border-grey"
              ></textarea>
              <div className="flex mt-3 justify-center mx-auto w-[90%]">
                <button
                  onClick={handleSubmit}
                  disabled={isFilled}
                  className={`${isFilled
                      ? "bg-grey text-white/60"
                      : "bg-secondary text-[#1B4E6B]"
                    }  w-full mt-5 rounded-[30px] cursor-pointer  relative font-semibold py-4`}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
