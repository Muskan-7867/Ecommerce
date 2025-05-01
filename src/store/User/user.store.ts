import { create } from "zustand";

type userType = {
  email: string;
  userName: string;
  setUser: (email: string, userName: string) => void;
  
};
const useUserStore = create<userType>()((set) => ({
   email: "",
   userName: "",
   setUser : (email: string, userName: string) => set({ email , userName}),


}));

export default useUserStore;