import { getDateNow } from "@/utils/getDateNow";
import { SetStateAction } from "react";
import { useEffect } from "react";

export default function InputDate({
  value,
  setValue,
}: {
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
}) {

  useEffect(() => {
    // Set nilai default saat pertama kali komponen dimuat
    if (!value) {
      setValue(getDateNow());
    }
  }, [value, setValue]);

  
  return (
    <div className="w-full relative">
      <label className="text-white font-medium block" htmlFor="date">
        Date <span className="text-danger">*</span>
      </label>
      <input
        id="date"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        type="text"
        disabled
        className="text-white text-xs md:text-sm mt-2 w-full md:max-w-[50%] px-[18px] py-4 border rounded-[4px] bg-grey/60"
      />
      {/* <input
        id="date"
        type="date"
        className="text-white textsm mt-2 w-full max-w-[50%] px-[18px] py-4 border rounded-[4px] border-grey bg-grey/60"
        value={getDateNow()}
      /> */}
    </div>
  );
}
