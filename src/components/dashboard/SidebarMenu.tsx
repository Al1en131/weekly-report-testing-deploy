import styles from "@/styles/border.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
export default function SidebarMenu({
  path,
  mode,
  data,
}: {
  mode: "MOBILE" | "DESKTOP";
  path: string | RegExp;
  data: { title: string; icon: React.ReactNode; menu: any[]; id: string };
}) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  return (
    <div className="w-full relative">
      <button
        onClick={() => setIsActive((v) => !v)}
        className={`${styles.border_link} ${
          pathname.match(path) && styles.border_link_active
        } rounded-[10px] w-full ${
          mode == "MOBILE" && "justify-center px-6"
        }  px-5 py-3 flex gap-4 items-center justify-between text-[#8DA6B5] group hover:text-white text-[14px]`}
      >
        {mode == "DESKTOP" ? (
          <>
            <div className="flex gap-4">
              {data.icon} {data.title}
            </div>
            <IoIosArrowDown
              className={`transition-all ${isActive && "rotate-180"}`}
            />
          </>
        ) : (
          <>{data.icon}</>
        )}
      </button>
      <div
        className={`grid ${
          isActive ? "grid-rows-1" : "grid-rows-[0px]"
        } overflow-hidden relative rounded-[10px]  text-[#8DA6B5]  text-[14px]`}
      >
        <ul>
          {data.menu.map((v, index) => {
            return (
              <Link
                key={index}
                href={v.url}
                className={`${styles.border_link} ${
                  mode == "MOBILE" && "text-center"
                } ${
                  pathname.startsWith(v.url) && styles.border_link_active
                } rounded-[10px] px-5 py-3 flex flex-col gap-4 text-[#8DA6B5] hover:text-white text-[14px]`}
              >
                {mode == "DESKTOP" ? (
                  <> {v.title}</>
                ) : (
                  <>{v.title.substring(0, 3)}</>
                )}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
