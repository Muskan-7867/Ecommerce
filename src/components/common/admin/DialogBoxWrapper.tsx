import React from "react";
import DialogBox from "./ActionDialogbox";
import type { DialogPosition } from "../../../utills/getDialogPosition";

interface Props<T> {
  position: DialogPosition;
  setOpenDialog: React.Dispatch<React.SetStateAction<number | null>>;
 row: T
}

const DialogBoxWrapper = <T,>({ position, setOpenDialog , row}: Props<T>) => {
  return (
    <div
      className={`absolute right-0 z-10 ${
        position === "top" ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      <DialogBox setOpenDialog={setOpenDialog} row={row} />
    </div>
  );
};

export default DialogBoxWrapper;
