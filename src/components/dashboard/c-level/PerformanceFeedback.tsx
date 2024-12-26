import Link from "next/link";

import styles from "@/styles/border.module.css";
import { StarIcon } from "@/components/icons";
export default function PerformanceFeedback() {
  return (
    <section
      id="sixth-driver"
      className={`${styles.border_section} mt-5 relative rounded-[8px]  p-5 bg-[#0D2735]`}
    >
      <div className="bg-secondary pl-2 pb-2 flex justify-center items-center   absolute right-0 top-0 rounded-bl-full  w-12 h-12">
        <StarIcon />
      </div>
      <h3 className="relative">Performance Feedback</h3>

      <div className="flex flex-col gap-3 mt-6 overflow-y-auto relative rm-scroll h-[196px]">
        {new Array(5).fill(0).map((_, index) => {
          return (
            <article key={index} className="bg-[#164159] p-4 rounded-[4px]">
              <h5 className="font-semibold text-white text-base">5 Jun 2024</h5>

              <div className="mt-3">
                <p className="font-light text-xs text-grey">
                  Hailo thank you banget yaa atas kerja kerasnya selama satu
                  bulan ini, you are very very cool, semoga tetap semangat
                  selalu ya ke depannya! Untuk feedbacknya sebenernya udah keren
                  banget ya semua tasks bulan ini beres, keren, cuma mungkin
                  next time komunikasi dengan rekan tim bisa ditingkatkan yaa,
                  jangan sungkan-sungkan nanya atau chat di grup, jangan
                  malu-malu okeyy? That’s all thank you banget yaa, semangaaat
                  ganbatte hwaiting!!! Show More{" "}
                </p>
                <Link href={"/"} className="text-secondary text-xs font-medium">
                  Show More
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
