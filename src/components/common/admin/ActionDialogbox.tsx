import React from "react";

const DialogBox: React.FC = () => {
  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-[#FFFFFF] rounded-lg shadow-lg w-[10rem]">
        <div className="border-b border-[#BBBBBB] px-4 py-4 font-semibold text-custom-red">Action</div>
        <ul className="divide-y text-[#000000]">
          <li className="px-4 py-4 hover:bg-gray-200 cursor-pointer">View</li>
          <li className="px-4 py-4 hover:bg-gray-200 cursor-pointer">Edit</li>
          <li className="px-4 py-4 hover:bg-gray-200 cursor-pointer">Disable</li>
          <li className="px-4 py-4 hover:bg-gray-200 cursor-pointer">Connect Via</li>
        </ul>
      </div>
    </div>
  );
};

export default DialogBox;
