import { getDateNow } from "@/utils/getDateNow";

export default function Input({
  title,
  name,
  value,
}: {
  title: string;
  name: string;
  value: string;
}) {
  return (
    <div className="w-full relative">
      <label className="text-white font-medium block" htmlFor={name}>
        {title}
      </label>
      <input
        id={name}
        type="text"
        className="text-white textsm mt-2 w-full  px-[18px] py-4 border rounded-[4px] border-grey bg-grey/60"
        readOnly
        value={value}
      />
    </div>
  );
}
