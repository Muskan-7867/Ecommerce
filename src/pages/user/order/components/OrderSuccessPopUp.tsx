import Lottie from "lottie-react";
import confirmAnimation from "../../../../../public/animations/confirm.json";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { CurrentUser } from "../../../../types/auth";

const OrderSuccessPopUp = () => {
  const { currentUser } = useCurrentUser() as {
    currentUser: CurrentUser | null;
  };
  if (!currentUser || !currentUser.address) return null;

  return (
      <div className="flex justify-center items-center min-h-screen ">
        <div >
          <Lottie animationData={confirmAnimation} loop={false}/>
          <p className="text-lg font-serif text-center">Thank You!</p>
          <p className="text-center text-2xl font-serif">
            Your Order is Confirmed!
          </p>
        </div>
      </div>

    
  );
};

export default OrderSuccessPopUp;
