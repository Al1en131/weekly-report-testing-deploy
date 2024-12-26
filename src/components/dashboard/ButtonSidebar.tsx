import useActive from "@/hooks/useActive";
import { IoIosArrowBack } from "react-icons/io";
import styles from "@/styles/border.module.css";

export default function ButtonSidebar() {
  const { isActive, setIsActive } = useActive();
  return (
    <div>



{/* Hamburger Button SideBar */}
      <div
        className={`py-3 hidden md:block ${isActive ? "w-[104px]" : "w-[256px]"
          }  transition-all ease-linear duration-[400ms] absolute`}
      >
        <div className="py-2 relative ">
          <div
            onClick={() => setIsActive()}
            className={`${styles.border_arrow} cursor-pointer  flex justify-center item absolute bottom-3 -right-3 z-50    p-2 rounded-full  bg-[#0F090C66]  text-secondary`}
          >
            <IoIosArrowBack
              className={`${isActive && "rotate-180"}  transition-all`}
            />
          </div>
          <div className="w-[142px]  h-[80px] mx-auto" />
        </div>
      </div>
    </div>
  );
}
