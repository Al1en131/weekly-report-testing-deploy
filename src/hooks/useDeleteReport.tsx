import { StoreApi, UseBoundStore, create } from "zustand";

type typeIsActive = {
  isActive: string;
  refetch: boolean;
  setIsActive: (v: string) => any;
  setRefetch: () => any;
};

const useDeleteReport: UseBoundStore<StoreApi<typeIsActive>> = create(
  (set) => ({
    isActive: "",
    refetch: false,
    setIsActive: (v: string) =>
      set((state: { isActive: string }) => ({ isActive: v })),
    setRefetch: () =>
      set((state: { refetch: boolean }) => ({ refetch: !state.refetch })),
  })
);

export default useDeleteReport;
