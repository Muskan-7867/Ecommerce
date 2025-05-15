import React from "react";
import DialogBox from "./ActionDialogbox";
import type { DialogPosition } from "../../../utills/getDialogPosition";

interface Props {
  position: DialogPosition;
  setOpenDialog: React.Dispatch<React.SetStateAction<number | null>>;
}

const DialogBoxWrapper: React.FC<Props> = ({ position, setOpenDialog }) => {
  return (
    <div
      className={`absolute right-0 z-10 ${
        position === "top" ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      <DialogBox setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default DialogBoxWrapper;
