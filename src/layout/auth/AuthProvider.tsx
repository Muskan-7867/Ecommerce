import { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {  currentUserFromStore } = useCurrentUser();

  useEffect(() => {
   console.log("from auth provider", currentUserFromStore,);
  },[currentUserFromStore])

  return <div>{children}</div>;
};

export default AuthProvider;
