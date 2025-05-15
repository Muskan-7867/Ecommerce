import React, { useState, useRef } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useSingleProductStore } from "../../../store/product/Table.store";
import TableImageRender from "./TableImageRednder";
import DialogBoxWrapper from "./DialogBoxWrapper";
import { getDialogPosition, DialogPosition } from "../../../utills/getDialogPosition"

interface Column<T> {
  label: string | React.ReactNode;
  key: keyof T | "checkbox" | "action";
  bg?: string;
  render?: () => React.ReactNode;
  renderData?: (row: T) => React.ReactNode;
}

interface TableProps<T extends { [key: string]: unknown }> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends { [key: string]: unknown }>({
  columns,
  data
}: TableProps<T>) => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [dialogPosition, setDialogPosition] = useState<DialogPosition>("bottom");
  const { setSelectedProduct } = useSingleProductStore();
  const tableRef = useRef<HTMLTableElement>(null);

  const handleActionClick = (
    rowIndex: number,
    event: React.MouseEvent,
    row: T
  ) => {
    setSelectedProduct(row);

    if (openDialog === rowIndex) {
      setOpenDialog(null);
      return;
    }

    const container = tableRef.current;
    const trigger = event.currentTarget;

    if (container && trigger) {
      const containerRect = container.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      const position = getDialogPosition(containerRect, triggerRect, 200);
      setDialogPosition(position);
    }

    setOpenDialog(rowIndex);
  };

  return (
    <div ref={tableRef} className="overflow-x-auto w-full">
      <table className="min-w-[700px] w-full text-left mt-4 border-collapse">
        <thead>
          <tr className="bg-[#F4F4F4] text-[#000] font-poppins font-semibold text-sm leading-normal">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`py-3 px-4 text-center whitespace-nowrap ${
                  column.bg || ""
                } ${column.key !== "action" ? "border-r-[3px] border-r-[#F1F1F1]" : ""}`}
              >
                {column.render ? column.render() : column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#333] font-poppins text-sm">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="relative">
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`py-4 px-4 text-center whitespace-nowrap ${
                    column.bg || ""
                  } ${
                    column.key !== "action"
                      ? "border-r-[3px] border-r-[#F1F1F1]"
                      : ""
                  } ${
                    column.key !== "checkbox"
                      ? "border-b border-b-[#000]"
                      : ""
                  }`}
                >
                  {column.key === "images" ? (
                    <TableImageRender images={row[column.key]} />
                  ) : column.key === "inStock" ? (
                    row[column.key] ? "In Stock" : "Out Of Stock"
                  ) : column.key === "action" ? (
                    <button
                      className="p-2 text-[#000] font-extrabold text-2xl"
                      onClick={(e) => handleActionClick(rowIndex, e, row)}
                    >
                      <CiMenuKebab />
                    </button>
                  ) : (
                    row[column.key] as React.ReactNode
                  )}
                </td>
              ))}

              {openDialog === rowIndex && (
                <DialogBoxWrapper
                  position={dialogPosition}
                  setOpenDialog={setOpenDialog}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
