import { useEffect } from "react";
import useCurrentUserStore from "../../store/User/user.store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {  currentUserFromStore, isLoggined } = useCurrentUserStore();
  console.log(isLoggined)

  useEffect(() => {
   console.log("from auth provider", currentUserFromStore,);
  },[currentUserFromStore])

  return <div>{children}</div>;
};

export default AuthProvider;
