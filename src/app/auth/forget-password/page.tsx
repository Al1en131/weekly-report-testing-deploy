"use client";

import FormSection from "@/components/auth/forget-password/FormSection";
import InfoSection from "@/components/auth/section/InfoSection";

export default function AuthPage() {
  //   const { isPending, error, data } = useQuery<Articles[]>({
  //     queryKey: ["repoData"],
  //     queryFn: () => axios.get("/api/articles").then((res) => res.data.data),
  //   });

  //   const { isPending, error, data } = useFetching<Article>(
  //     "repoData",
  //     "/api/articles"
  //   );

  //   useEffect(() => {
  //     console.log(data?.data.map);
  //   }, [isPending]);

  return (
    <main className="flex flex-col lg:flex-row bg-primary min-h-screen">
      <InfoSection />
      <FormSection />
    </main>
  );
}
