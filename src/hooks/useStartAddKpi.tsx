import { StoreApi, UseBoundStore, create } from "zustand";

type typeIsActive = {
  isActive: boolean;
  setIsActive: (v: boolean) => any;
};

const useStartAddKpi: UseBoundStore<StoreApi<typeIsActive>> = create((set) => ({
  isActive: false,
  setIsActive: (v: boolean) =>
    set((state: { isActive: boolean }) => ({ isActive: v })),
}));

export default useStartAddKpi;
