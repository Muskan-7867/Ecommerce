import { useEffect } from "react";
import { fetchCurrentUser } from "../services/fetchers";
import { CurrentUser } from "../types/auth";
import useCurrentUserStore from "../store/User/user.store";
import Cookies from "js-cookie";

const useCurrentUser = () => {
  const { setCurrentUserForStore, currentUserFromStore, setIsLoggined, reFetch, fetch} =  useCurrentUserStore();

  
  const allocateCurrentUser = (user: CurrentUser | null) => {
    setCurrentUserForStore(user)
  }
 
  const fetchUser = async () => {
    console.log("fetch user func");
    try {
      const user = await fetchCurrentUser(Cookies.get("authToken"));
      if (user) {
        setIsLoggined(true);
        // setCurrentUser(user);
        allocateCurrentUser(user as CurrentUser);
      }
      // console.log("from hook", user);
    } catch {
      console.log("something went wrong");
     setIsLoggined(false);
    }
  };

  useEffect(() => {
    console.log("first render of hook");
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("refetch");
    fetchUser();
  }, [fetch])

  // useEffect(() => {
  //   setCurrentUserForStore(currentUser);
  //   // console.log("from hook", currentUser);
  // }, [currentUser]);
 


  return {
    currentUserFromStore,
    fetchUser,
    allocateCurrentUser,
    reFetch,
    
  };
};

export default useCurrentUser;
