import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/fetchers";
import { CurrentUser } from "../types/auth";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null | unknown>(null);
  const fetchUser = async () => {
    try {
      const user = await fetchCurrentUser();
      setCurrentUser(user);
      console.log("from hook", user);
    } catch {
      console.log("something went wrong");
      setCurrentUser(null)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return { fetchUser, currentUser, setCurrentUser };
};

export default useCurrentUser;
