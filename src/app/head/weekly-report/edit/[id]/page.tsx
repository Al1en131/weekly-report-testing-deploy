"use client";

import "driver.js/dist/driver.css";
import styles from "@/styles/border.module.css";
import InputDate from "@/components/dashboard/weekly-report/InputDate";
import Textarea from "@/components/dashboard/weekly-report/Textarea";
import Navbar from "@/components/dashboard/Navbar";
import DropInputFile from "@/components/dashboard/weekly-report/DropInputFile";
import { useEffect, useState } from "react";
import ButtonSubmit from "@/components/dashboard/weekly-report/ButtonSubmit";
import ButtonDelete from "@/components/dashboard/weekly-report/ButtonDelete";
import useSuccess from "@/hooks/useSuccess";
import { useParams } from "next/navigation";
import axios from "axios";
import { getToken } from "@/utils/token";
import useDeleteReport from "@/hooks/useDeleteReport";
import useError from "@/hooks/useError";

export default function DashboardStaffPage() {
  const [image, setImage] = useState<Blob | string>("");
  const [date, setDate] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const params = useParams();
  const token = getToken();
  const { setIsActive } = useSuccess();
  const { isActive, setIsActive: setIsActiveDelete } = useDeleteReport();
  const { setIsActive: setError } = useError();
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const formData = new FormData();
      formData.append("report", report);
      if (image) {
        formData.append("image", image);
      }
      formData.append("date", date);
      const result = await axios.post(`/api/reports/${params.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      setIsActive([
        {
          title: "Report Submitted!",
          message:
            "You have submitted today&apos;s report. You have the option to edit or delete it.",
        },
      ]);
    } catch (e) {
      console.log(e);
      setError([
        {
          title: "Failed!",
          message: "Try again soon",
        },
      ]);
    }
  };
  useEffect(() => {
    const getReport = async () => {
      const result = await axios.get(`/api/reports/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReport(result.data.data.report);
    };
    getReport();
  }, [token, params.id]);
  return (
    <main>
      <Navbar title="Weekly Report" />
      <section
        className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        <InputDate value={date} setValue={setDate} />
        <Textarea value={report} setValue={setReport} className="mt-4" />

        <DropInputFile className="mt-4" value={image} setValue={setImage} />

        <div className="flex gap-4 px-5 relative mt-5">
          <ButtonSubmit onClick={handleSubmit}>Edit Report</ButtonSubmit>
          <ButtonDelete
            onClick={() => {
              setIsActiveDelete(params.id as string);
            }}
          >
            Delete
          </ButtonDelete>
        </div>
      </section>
    </main>
  );
}
