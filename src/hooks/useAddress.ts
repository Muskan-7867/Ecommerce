import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import Cookies from "js-cookie";

const useAddress = () => {
  const [isAddressAvailable, setIsAddressAvailable] = useState<boolean>(false);

  const token = Cookies.get("authToken");
  const { currentUserFromStore } = useCurrentUser() 
  useEffect(() => {
    if (!currentUserFromStore) return;
    if (currentUserFromStore?.address) {
      setIsAddressAvailable(true);
    } else {
      setIsAddressAvailable(false);
    }
  }, [currentUserFromStore]);

  const fetchUserAndAddress = async () => {
    if (!token || !currentUserFromStore?.address) return;
  };

  return { isAddressAvailable, fetchUserAndAddress };
};

export default useAddress;
