import styles from "@/styles/border.module.css";
import { MedalIcon } from "../icons";
export default function CompletionReport() {
  return (
    <section
      id="third-driver"
      className={`${styles.border_section} w-3/12 overflow-hidden flex flex-col justify-between  relative rounded-[8px]  p-4 bg-[#0D2735] max-lg:w-full`}
    >
      <div className="bg-secondary pl-2 pb-2 flex justify-center items-center   absolute right-0 top-0 rounded-bl-full  w-12 h-12">
        <MedalIcon />
      </div>
      <h4 className="text-white font-medium relative text-sm max-w-[80%]">
        My Weekly Report Completion
      </h4>
      <h5 className="text-white text-dash-nav relative font-bold">60%</h5>
    </section>
  );
}
