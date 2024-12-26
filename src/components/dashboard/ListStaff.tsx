import { getDateNow } from "@/utils/getDateNow";
import Image from "next/image";
import styles from "@/styles/border.module.css";
import { FaCheck } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack, IoIosClose } from "react-icons/io";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/token";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TickFill, XIcon } from "../icons";
import { staff as staffDummy } from "@/data/dummy";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";

export default function ListStaff({ root }: { root: string }) {
  const [staff, setStaff] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const token = getToken();

  useEffect(() => {
    const getStaff = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get("/api/authz/groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const report = await axios.get("/api/reports", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        console.log(result, report);
        setReports(report.data.data.others);
        setStaff(result.data.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getStaff();
  }, [token]);
  return (
    <section
      id="fourth2-driver"
      className={`${styles.border_section}  overflow-y-hidden   relative rounded-[8px]  p-5 bg-[#0D2735]`}
    >
      <div className="flex relative justify-between items-center">
        <div className="max-lg:w-8/12">
          <h3 className="text-sm text-grey">My Staff Report Completion</h3>
          <h4 className="font-bold">{getDateNow()}</h4>
        </div>
        <div className="max-lg:w-4/12">
        <Link href={`${root}/my-staff-report`}>
          <button className="flex text-sm max-lg:text-xs font-medium gap-2 text-secondary bg-transparent rounded-[30px] border max-lg:px-2 py-2 px-6 border-secondary items-center">
            See Staff Report <HiArrowRight />
          </button>
        </Link>
        </div>
      </div>
      <div className="flex   gap-5 relative mt-8 items-center justify-around">
        <button
          ref={navigationPrevRef}
          className="bg-secondary flex items-center justify-center text-xl text-primary rounded-full p-1 h-fit"
        >
          <IoIosArrowBack />
        </button>
        <div className="w-[80%]">
          <Swiper
            spaceBetween={1}
            slidesPerView={5}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            modules={[Navigation]}
            onSlideChange={(e) => {
              console.log(e.activeIndex);
            }}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              staff?.map((v, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="flex flex-col  items-center     justify-center  "
                  >
                    <Image
                      src={"/assets/image/Avatar.png"}
                      className="w-[36px] aspect-square mx-auto rounded-full"
                      alt="Staff Image"
                      height={100}
                      width={100}
                    />
                    <span className="text-xs block my-2 text-center">
                      {v.name?.split(" ")?.splice(0, 2)?.join(" ")}
                    </span>

                    {reports?.filter((value) => {
                      return value.user.uuid == v.uuid;
                    }).length ? (
                      <div className="w-[20px] mx-auto bg-[#62A584] text-sm rounded-full  flex justify-center items-center aspect-square ">
                        <FaCheck />
                      </div>
                    ) : (
                      <div className="w-[20px] mx-auto bg-[#D45B53]   rounded-full  flex justify-center items-center aspect-square ">
                        <IoIosClose />
                      </div>
                    )}
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
        <button
          ref={navigationNextRef}
          className="bg-secondary relative flex items-center justify-center text-xl text-primary rounded-full p-1 h-fit"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
}
