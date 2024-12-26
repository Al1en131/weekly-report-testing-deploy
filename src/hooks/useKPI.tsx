import { StoreApi, UseBoundStore, create } from "zustand";

type typeIsActive = {
  kpi: any[];
  setKpi: (fn: (prev: any[]) => any[]) => any;
};

const useKPI: UseBoundStore<StoreApi<typeIsActive>> = create((set) => ({
  kpi: [],
  setKpi: (fn: (prev: any[]) => any[]) => {
    set((state: { kpi: any[] }) => ({ kpi: fn(state.kpi) }));
  },
}));

export default useKPI;
