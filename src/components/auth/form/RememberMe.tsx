import { SetStateAction } from "react";
import { IoCheckmark } from "react-icons/io5";
export default function RememberMe({
  className,
  rememberme,
  setRememberme,
}: {
  className?: string;
  rememberme: boolean;
  setRememberme: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setRememberme((v) => !v)}
      className={`text-[12px] flex gap-1 items-center ${className} w-fit`}
    >
      <div className="w-[16px] h-[16px] bg-secondary text-black flex items-center justify-center rounded-[3px]">
        {rememberme ? <IoCheckmark /> : null}
      </div>

      <label htmlFor="rememberme" className="text-white text-sm">
        Remember Me
      </label>
    </div>
  );
}
