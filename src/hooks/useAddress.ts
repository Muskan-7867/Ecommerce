import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import { CurrentUser } from "../types/auth";
import Cookies from "js-cookie";

const useAddress = () => {
  const [isAddressAvailable, setIsAddressAvailable] = useState<boolean>(false);

  const token = Cookies.get("authToken");
  const { currentUser } = useCurrentUser() as {
    currentUser: CurrentUser | null;
  };

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser?.address) {
      setIsAddressAvailable(true);
    } else {
      setIsAddressAvailable(false);
    }
  }, [currentUser]);

  const fetchUserAndAddress = async () => {
    if (!token || !currentUser?.address) return;
  };

  return { isAddressAvailable, fetchUserAndAddress };
};

export default useAddress;
