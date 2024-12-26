"use client";

import "driver.js/dist/driver.css";
import styles from "@/styles/border.module.css";
import Input from "@/components/dashboard/profile/Input";
import Textarea from "@/components/dashboard/weekly-report/Textarea";
import Navbar from "@/components/dashboard/Navbar";
import { useEffect, useState } from "react";
import ButtonSubmit from "@/components/dashboard/weekly-report/ButtonSubmit";
import ButtonDelete from "@/components/dashboard/weekly-report/ButtonDelete";
import useSuccess from "@/hooks/useSuccess";
import DropInputFile from "@/components/dashboard/profile/DropInputFile";
import axios from "axios";
import { getId, getToken } from "@/utils/token";

export default function ProfilePage() {
  const [cover, setCover] = useState<Blob | string>("");
  const { setIsActive } = useSuccess();

  const [account, setAccount] = useState<any>({
    name: "",
    image: "",
    division: "",
    position: "",
  });
  const token = getToken();
  const uuid = getId();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`/api/authz/users/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccount({
          name: user.data?.data?.name,
          image: user.data?.data?.image,
          division: user.data?.data?.division?.name,
          position: user.data?.data?.position,
          batch: user.data?.data?.batch,
        });
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [token, uuid]);

  return (
    <main>
      <nav className="flex justify-between items-center">
        <h1 className="text-dash-nav font-bold">Profile</h1>
      </nav>
      <section
        className={`${styles.border_section} p-7 bg-[#0D2735] mt-5 rounded-lg`}
      >
        {/* <DropInputFile className="mt-4" value={cover} setValue={setCover} /> */}
        <div className="md:grid md:grid-cols-2 max-lg:space-y-4 gap-5 max-lg:mt-5 mt-12">
          <Input value={account.name} name="name" title="Name" />
          <Input value={account.position} name="position" title="Position" />
          <Input value={account.division} name="division" title="Division" />
          <Input value={account.batch} name="batch" title="Batch" />
        </div>

        <div className="flex gap-4 mx-auto md:max-w-[50%] relative mt-5">
          <ButtonSubmit
            onClick={() =>
              setIsActive([{ title: "Congrat", message: "HORRAY" }])
            }
          >
            Update Profile
          </ButtonSubmit>
        </div>
      </section>
    </main>
  );
}
