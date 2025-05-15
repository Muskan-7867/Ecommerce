import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/fetchers";
import { CurrentUser } from "../types/auth";
import useCurrentUserStore from "../store/User/user.store";

const useCurrentUser = () => {
  const {  setCurrentUserForStore , setIsLoggined, fetch} =
    useCurrentUserStore();
  // console.log("from hook---> ", currentUserFromStore);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null | unknown>(
    null
  );

  const fetchUser = async () => {
    try {
      const user = await fetchCurrentUser();
      if(user){
        setIsLoggined(true);
        setCurrentUser(user);
      }
      // console.log("from hook", user);
    } catch {
      console.log("something went wrong");
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetch]);

  useEffect(() => {
    setCurrentUserForStore(currentUser);
    // console.log("from hook", currentUser);
  }, [currentUser]);

  return { fetchUser, currentUser, setCurrentUser };
};

export default useCurrentUser;
