"use client";

import apiClient from "@/utils/apiCLient";
import FormSection from "@/components/auth/section/FormSection";
import InfoSection from "@/components/auth/section/InfoSection";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthPage() {
  // const { isPending, error, data } = useQuery<Articles[]>({
  //   queryKey: ["repoData"],
  //   queryFn: () => axios.get("/api/articles").then((res) => res.data.data),
  // });

  // const { isPending, error, data } = useFetching<Article>(
  //   "repoData",
  //   "/api/articles"
  // );

  // useEffect(() => {
  //   console.log(data?.data.map);
  // }, [isPending]);

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await apiClient.get("/")
  //       console.log(response.data);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <main className="flex flex-col lg:flex-row md:bg-primary max-lg:bg-transparent min-h-screen">
      <InfoSection />
      <FormSection />
    </main>
  );
}
