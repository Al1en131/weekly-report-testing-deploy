"use client";

import "driver.js/dist/driver.css";
import styles from "@/styles/border.module.css";
import InputDate from "@/components/dashboard/weekly-report/InputDate";
import Textarea from "@/components/dashboard/weekly-report/Textarea";
import Navbar from "@/components/dashboard/Navbar";
import DropInputFile from "@/components/dashboard/weekly-report/DropInputFile";
import { useEffect, useState } from "react";
import ButtonSubmit from "@/components/dashboard/weekly-report/ButtonSubmit";
import useSuccess from "@/hooks/useSuccess";
import axios from "axios";
import { getToken } from "@/utils/token";
import { format } from "date-fns";
import useError from "@/hooks/useError";

export default function WeeklyReportPage() {
  const [image, setImage] = useState<Blob | string>("");
  const { setIsActive: setError } = useError();
  const [date, setDate] = useState<string>("");
  const [isFilled, setIsFilled] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [report, setReport] = useState<string>("");
  const token = getToken();
  const { setIsActive } = useSuccess();
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(image, date, report);
    try {
      const formData = new FormData();
      formData.append("report", report);
      if (image) {
        formData.append("image", image);
      }
      formData.append("date", date);

      await axios.post("/api/reports", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsActive([
        {
          title: "Report Submitted!",
          message:
            "You have submitted today&apos;s report. You have the option to edit or delete it.",
        },
      ]);
    } catch (e) {
      setError([{ title: "Error", message: "Try Again soon" }]);
      console.log(e);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getReport = async () => {
      try {
        const report = await axios.get("/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const myreport: any[] = report.data.data.self;
        const resultFilter = myreport.filter((value) => {
          return (
            format(Date.now(), "dd MM yyyy") ==
            format(Date.parse(value.created_at), "dd MM yyyy")
          );
        });
        if (resultFilter.length) {
          setError([
            {
              title: "Can’t Add Report",
              message: "Report already filled in",
            },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getReport();
  }, [token, setError]);

  return (
    <main>
      <Navbar title="Weekly Report" />
      <section
        className={`${styles.border_section} w-full overflow-x-auto p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        <InputDate value={date} setValue={setDate} />
        <Textarea value={report} setValue={setReport} className="mt-4" />

        <DropInputFile className="mt-4 w-full overflow-x-auto" value={image} setValue={setImage} />
        <div className="w-full md:w-[40%] mx-auto relative mt-5">
          <ButtonSubmit disabled={isLoading} onClick={handleSubmit}>
            Submit Report
          </ButtonSubmit>
          {/* <ButtonSubmit onClick={() => setIsActive()}>
            Submit Report
          </ButtonSubmit> */}
        </div>
      </section>
    </main>
  );
}
