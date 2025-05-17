import { Link } from "react-router-dom";
import UserProfile from "../../../components/common/admin/UserProfile";

const Header: React.FC = () => {
  return (
    <div className=" h-18 ">
      <div className="m-4 flex justify-end lg:gap-28">
        <Link
          to="/adminregister"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Sign Up
        </Link>

        <UserProfile
          name={"xyz"}
          email={"xyz@gmail.com"}
          role={"admin"}
          imageUrl="/public/assets/user.png"
        />
      </div>
    </div>
  );
};

export default Header;
