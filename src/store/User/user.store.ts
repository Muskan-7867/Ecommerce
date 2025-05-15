import { create } from "zustand";
import { CurrentUser } from "../../types/auth";



type userStore = {
  currentUserFromStore: CurrentUser | null | unknown;
  setCurrentUserForStore: (user: CurrentUser | null | unknown) => void;
  isLoggined: boolean;
  setIsLoggined: (state: boolean) => void;
  fetch : boolean;
  reFetch : () => void;
};

const useCurrentUserStore = create<userStore>()((set, get) => ({
  currentUserFromStore: { email: "", username: "", _id: "" , contact:'', role:'', address:"" },
  setCurrentUserForStore: (user) => set({ currentUserFromStore: user }),
  isLoggined: false,
  setIsLoggined: (state) => set({ isLoggined: state }),
  fetch: false,
  reFetch: () => set({ fetch: !get().fetch }),
}));

export default useCurrentUserStore ;
