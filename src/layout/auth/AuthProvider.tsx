import { useEffect } from "react";
import useCurrentUserStore from "../../store/User/user.store";
import useCurrentUser from "../../hooks/useCurrentUser";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { reFetch, currentUserFromStore } = useCurrentUserStore();
  const { currentUser } = useCurrentUser();
  

  useEffect(() => {
    reFetch();
    if (currentUser) {
      console.log("from hook", currentUserFromStore, currentUser);
    }
  }, [currentUser, currentUserFromStore, reFetch]);

  return <div>{children}</div>;
};

export default AuthProvider;
