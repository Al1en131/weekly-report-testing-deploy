import Link from "next/link";
import { MessageIcon, StarIcon } from "../icons";
import styles from "@/styles/border.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/token";
import { format } from "date-fns/format";
export default function PerformanceFeedback() {
  const token = getToken();
  const [feedback, setFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get("/api/performance/feedbacks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedback(result?.data?.data?.self);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [token]);
  return (
    <section
      id="sixth-driver"
      className={`${styles.border_section} relative rounded-[8px]  p-5 bg-[#0D2735]`}
    >
      <div className="bg-secondary pl-2 pb-2 flex justify-center items-center   absolute right-0 top-0 rounded-bl-full  w-12 h-12">
        <StarIcon />
      </div>
      <h3 className="overflow-x-auto relative">Performance Feedback</h3>

      <div className="flex flex-col gap-3 mt-6 overflow-y-auto relative rm-scroll h-[196px]">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {feedback.length > 0 ? (
              feedback.map((value, index) => {
                return (
                  <article
                    key={index}
                    className="bg-[#164159] p-4 rounded-[4px]"
                  >
                    <h5 className="font-semibold text-white text-base">
                      {/* 5 Jun 2024 */}
                      {format(
                        new Date(Date.parse(value.created_at)),
                        "dd MMM yyyy"
                      )}
                    </h5>

                    <div className="mt-3">
                      <div
                        className="font-light text-xs text-grey"
                        dangerouslySetInnerHTML={{
                          __html: showMore
                            ? value.feedback
                            : value.feedback.slice(0, 200),
                        }}
                      />
                      {value.feedback.length > 200 && (
                        <button
                          className="text-secondary text-xs font-medium"
                          onClick={() => setShowMore((v) => !v)}
                        >
                          {showMore ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="absolute flex flex-col gap-3 items-center inset-0">
                <MessageIcon />
                <p className="text-grey">There&apos;s no feedback yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
