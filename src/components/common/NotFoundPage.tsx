import Lottie from "lottie-react";
import notfound from "../../../public/animations/notFound.json";

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-[50rem] py-12 flex flex-col items-center justify-center  rounded-lg ">
      <Lottie
        animationData={notfound}
        className=" w-[18rem] h-[18rem] lg:w-[25rem] lg:h-[25rem]"
      />
      <p className="text-4xl font-bold">Page Not Found</p>
    </div>
  );
};

export default NotFoundPage;
