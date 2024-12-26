import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetching<T>(name: string, url: string) {
  const { isPending, error, data } = useQuery<T>({
    queryKey: [name],
    queryFn: () => axios.get(url).then((res) => res.data),
  });

  return { isPending, error, data };
}
