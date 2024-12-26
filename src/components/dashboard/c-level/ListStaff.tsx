const division = [
  { name: "Web Development", value: "Web Development" },
  {
    name: "Web Design",
    value: "Web Design",
  },
];

import { getDateNow } from "@/utils/getDateNow";
import Image from "next/image";
import styles from "@/styles/border.module.css";
import { FaCheck } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/token";
import { XIcon } from "@/components/icons";
import Link from "next/link";
import Select from "../Select";
import "@/styles/swiper-custom.css";

export default function ListStaff({ root }: { root: string }) {
  const [staff, setStaff] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [menu, setMenu] = useState(division[0].value);
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
        const divisions: any[] = result.data.data;
        const staff: any[] = [];
        divisions.forEach(({ members }: { members: any[] }) => {
          members.forEach((value) => {
            staff.push(value);
          });
        });

        setStaff(staff);

        setReports(report.data.data.others);
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
      className={`${styles.border_section}  overflow-y-hidden relative rounded-[8px] p-5 max-lg:px-3 bg-[#0D2735]`}
    >
      <div className="flex relative items-center justify-between">
        <div className="max-lg:w-4/6">
          <h3 className="text-sm text-grey">My Staff Report Completion</h3>
          <h4 className="font-bold text-sm">{getDateNow()}</h4>
        </div>
        <div className="max-lg:w-2/6">
        <Select value={menu} setValue={setMenu} data={division} />
        </div>
      </div>
      <div className="flex gap-5 relative mt-8 items-center justify-around">
        <button className="bg-secondary flex items-center justify-center text-xl text-primary rounded-full p-1 h-fit">
          <IoIosArrowBack />
        </button>
        <div className="grid grid-cols-5 relative gap-3 ">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            staff?.map((v, index) => {
              return (
                <div key={index} className="flex flex-col gap-2 items-center">
                  <Image
                    src={"/assets/image/Avatar.png"}
                    className="w-[36px] aspect-square rounded-full"
                    alt="Staff Image"
                    height={100}
                    width={100}
                  />
                  <span className="text-xs">{v.name}</span>
                  {reports?.filter((value) => {
                    return value.user.uuid == v.uuid;
                  }).length ? (
                    <div className="w-[24px] text-sm text-primary flex rounded-full justify-center items-center aspect-square bg-[#62A584]">
                      <FaCheck />
                    </div>
                  ) : (
                    <XIcon />
                  )}
                </div>
              );
            })
          )}
        </div>
        <button className="bg-secondary flex items-center justify-center text-xl text-primary rounded-full p-1 h-fit">
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
}
