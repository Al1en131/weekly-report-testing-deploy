import styles from "@/styles/border.module.css";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/token";
import { format, isEqual } from "date-fns";
import Link from "next/link";
import useDeleteReport from "@/hooks/useDeleteReport";
export default function EditReport({ root }: { root: string }) {
  const token = getToken();
  const [isFilled, setIsFilled] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { refetch } = useDeleteReport();

  useEffect(() => {
    const getReport = async () => {
      setIsLoading(true);
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

        setIsFilled(resultFilter);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getReport();
  }, [refetch, token]);
  return (
    <section
      id="second-driver"
      className={`${styles.border_section} w-9/12 overflow-hidden relative rounded-[8px]  p-5 bg-[#0D2735] max-lg:w-full`}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : isFilled.length ? (
        <>
          <Image
            width={100}
            height={100}
            alt="Checklist Logo"
            className="absolute bottom-0 right-0 w-16"
            src={"/assets/image/checklist.png"}
          />
          <div className="relative">
            <h4 className="font-bold text-base text-white">
              You Have Filled Out Your Report Today!
            </h4>

            <p className="text-sm text-grey">
              Do you want to edit your report?
            </p>
            <Link
              className="relative"
              href={`${root}/weekly-report/edit/${isFilled[0]?.uuid}`}
            >
              <Button>Edit Report</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Image
            width={100}
            height={100}
            alt="Checklist Logo"
            className="absolute bottom-0 right-0 w-16"
            src={"/assets/image/info-circle.png"}
          />
          <div className="relative">
            <h4 className="font-bold text-base text-white">
              You Haven&apos;t Submitted Today&apos;s Report!
            </h4>

            <p className="text-sm text-grey">
              Click the button to fill out your today’s report.
            </p>
            <Link className="relative" href={`${root}/weekly-report`}>
              <Button>Fill Out Now</Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
