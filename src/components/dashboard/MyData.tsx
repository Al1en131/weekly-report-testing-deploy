import styles from "@/styles/border.module.css";
import { DataIcon } from "../icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyData() {
  const [totalDivisions, setTotalDivisions] = useState<number>(0);
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const get = await axios.get("/api/authz/groups");

        const department = get.data.data;
        setTotalDivisions(department.length);
        const staff: any[] = [];
        department.forEach(({ members }: { members: any[] }) => {
          members.forEach((value) => {
            staff.push(value);
          });
        });

        setTotalStaff(staff.length);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <section
      id="third-driver"
      className={`${styles.border_section} h-full w-full overflow-hidden flex flex-col justify-between  relative rounded-[8px] max-lg:px-3 p-4 bg-[#0D2735]`}
    >
      <div className="bg-secondary pl-2 pb-2 flex justify-center items-center   absolute right-0 top-0 rounded-bl-full  w-12 h-12">
        <DataIcon />
      </div>
      <h3 className="font-bold relative text-xl">My Data</h3>
      <div className="flex gap-3 mt-5 relative">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="bg-primary flex-1   py-3 px-4 rounded-lg">
              <span className="font-medium text-sm block">Total Divisions</span>
              <span className="font-bold text-[40px] mt-2 leading-[56px] block">
                {totalDivisions}
              </span>
            </div>
            <div className="bg-primary flex-1  py-3 px-4 rounded-lg">
              <span className="font-medium text-sm block">Total Staffs</span>
              <span className="font-bold text-[40px] leading-[56px] mt-2 block">
                {totalStaff}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
