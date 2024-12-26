import { StoreApi, UseBoundStore, create } from "zustand";

type typeIsActive = {
  isActive: boolean;
  setIsActive: () => any;
};

const useActive: UseBoundStore<StoreApi<typeIsActive>> = create((set) => ({
  isActive: false,
  setIsActive: () =>
    set((state: { isActive: boolean }) => ({ isActive: !state.isActive })),
}));

export default useActive;
