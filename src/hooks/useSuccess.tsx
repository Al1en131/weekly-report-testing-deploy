import { StoreApi, UseBoundStore, create } from "zustand";

type typeIsActive = {
  isActive: any[];
  setIsActive: (v: any[]) => any;
};

const useSuccess: UseBoundStore<StoreApi<typeIsActive>> = create((set) => ({
  isActive: [],
  setIsActive: (v: any) =>
    set((state: { isActive: any[] }) => ({ isActive: v })),
}));

export default useSuccess;
