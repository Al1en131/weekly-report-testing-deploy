"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { format } from "date-fns";
import styles from "@/styles/border.module.css";

export default function AddFeedbackForm({ params, chooseFeedback, chooseStaff }: { 
  params: { month: string }; 
  chooseFeedback: any[]; 
  chooseStaff: string; 
}) {
  const [staff, setStaff] = useState<any>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilled, setIsFilled] = useState<boolean>(false); 
  const router = useRouter();
  const { uuid } = router.query;

  useEffect(() => {
    const fetchStaff = async () => {
      if (!uuid) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/staff/${uuid}`);
        setStaff(response.data);
      } catch (err) {
        console.error("Failed to fetch staff data", err);
      }
      setIsLoading(false);
    };
    fetchStaff();
  }, [uuid]);

  useEffect(() => {
    setFeedback(""); 
    const resultFeedback: any[] = chooseFeedback;
    const resultFilterFeedback = resultFeedback.filter((value) => {
      return (
        value.to.uuid === chooseStaff &&
        format(new Date(value.created_at), "MMMM").toLowerCase() ===
          params.month.toLowerCase()
      );
    });
    if (resultFilterFeedback.length) {
      setIsFilled(true);
      setFeedback(resultFilterFeedback[0]?.feedback); 
    } else {
      setIsFilled(false);
    }
  }, [chooseFeedback, chooseStaff, params.month]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("user_uuid", uuid as string);
      formData.append("feedback", feedback);

      const response = await axios.post(
        "/api/performance/feedbacks",
        formData,
        {
          headers: {
            Authorization: `Bearer YOUR_TOKEN`,
          },
        }
      );

      console.log("Feedback submitted:", response.data);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between">
        <label
          className="text-white font-medium block"
          htmlFor={"twelve-driver"}
        >
          Your Feedback
        </label>
        <h4 className="font-bold text-xl">
          {params.month.at(0)?.toUpperCase()}
          {params.month.slice(1)} 2024
        </h4>
      </div>

      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {/* Menampilkan informasi staff */}
          <div
            className={`${styles.border_section} bg-[#0D2735] flex gap-3 rounded-lg relative items-center py-3 px-4`}
          >
            {staff ? (
              <>
                <Image
                  src={staff.image || "/assets/image/Avatar.png"}
                  className="w-[44px] aspect-square rounded-full"
                  alt={`${staff.name} Profile`}
                  height={100}
                  width={100}
                />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-medium text-sm">{staff.name}</span>
                  <span className="text-[10px] text-grey">
                    {staff.position}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-white text-sm">Staff not found</span>
            )}
          </div>

          {/* Textarea untuk feedback */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={8}
            placeholder="How is this person’s performance this month?"
            className="text-white outline-none text-sm mt-2 w-full px-[18px] py-4 border rounded-[4px] bg-[#0D2735] border-white"
          ></textarea>

          {/* Tombol Submit */}
          <button
            onClick={handleSubmit}
            disabled={!feedback}
            className={`${
              !feedback
                ? "bg-grey text-white/60 cursor-not-allowed"
                : "bg-secondary text-[#1B4E6B]"
            } w-full mt-5 rounded-[30px] relative font-semibold py-4`}
          >
            Submit Feedback
          </button>
        </>
      )}
    </div>
  );
}
