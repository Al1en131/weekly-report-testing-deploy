import { useState } from "react";
import Progress, { ProgressType } from "./Progress";
import Select from "./Select";
import styles from "@/styles/border.module.css";
import { TasksIcon } from "../icons";

const monthSelect = [
  { name: "Jun", value: "jun" },
  { name: "Jul", value: "jul" },
  { name: "Aug", value: "aug" },
  { name: "Sep", value: "sep" },
];

const performance: ProgressType[] = [
  { title: "Activeness", grade: "A", score: 80 },
  { title: "Ability", grade: "A", score: 80 },
  { title: "Communication", grade: "C", score: 40 },
  { title: "Discipline", grade: "A", score: 100 },
  { title: "Average", grade: "Great", score: 75, variant: "BLUE" },
];

export default function PerformanceGrade() {
  const [month, setMonth] = useState<string>(monthSelect[0].value);
  return (
    <section
      id="fifth-driver"
      className={`${styles.border_section} h-full flex flex-col relative rounded-[8px]  p-5 bg-[#0D2735]`}
    >
      <div className="flex items-center max-lg:mb-5 justify-between relative">
        <h3 className="max-lg:w-4/6">Performance Grade</h3>
        <div className="max-lg:w-2/6">
          <Select value={month} setValue={setMonth} data={monthSelect} />
        </div>
      </div>
      <div className="relative h-full">
        {/* Progress */}
        {/* {performance.map((value, index) => {
          return value.variant !== "BLUE" ? (
            <Progress
              className="mt-4"
              variant={value.variant}
              key={index}
              grade={value.grade}
              score={value.score}
              title={value.title}
            />
          ) : (
            <Progress
              variant={value.variant}
              key={index}
              className="mt-6"
              grade={value.grade}
              score={value.score}
              title={value.title}
            />
          );
        })} */}

        <div className="w-full h-full overflow-x-auto inset-0 flex-col gap-5 flex justify-center items-center">
          <TasksIcon />
          <p className="text-grey">There&apos;s no grade yet.</p>
        </div>
      </div>
    </section>
  );
}
