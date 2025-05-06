import React, { useState, useRef } from "react";
import DialogBox from "./ActionDialogbox";
import TableImageRednder from "./TableImageRednder";
import { CiMenuKebab } from "react-icons/ci";
import { useSingleProductStore } from "../../../store/product/Table.store";

interface Column<T> {

  label: string | React.ReactNode;
  key: keyof T | "checkbox" | "action";
  bg?: string;
  render?: () => React.ReactNode;
  renderData?: (row: T) => React.ReactNode;
}

// Define table props
interface TableProps<T extends { [key: string]: unknown }> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends { [key: string]: unknown }>({
  columns,
  data
}: TableProps<T>) => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [dialogPosition, setDialogPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const { setSelectedProduct } = useSingleProductStore();
  const tableRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (
    rowIndex: number,
    event: React.MouseEvent,
    row: T
  ) => {
    setSelectedProduct(row);
    console.log("from table", row);
    // Toggle the dialog
    if (openDialog === rowIndex) {
      setOpenDialog(-1);
      return;
    }

    // Get the table and button positions
    const tableRect = tableRef.current?.getBoundingClientRect();
    const buttonRect = event.currentTarget.getBoundingClientRect();

    if (tableRect && buttonRect) {
      const spaceBelow = tableRect.bottom - buttonRect.bottom;
      const spaceAbove = buttonRect.top - tableRect.top;

      if (spaceBelow < 500 && spaceAbove > 150) {
        setDialogPosition("top");
      } else {
        setDialogPosition("bottom");
      }
    }
    setOpenDialog(rowIndex);
  };

  return (
    <div ref={tableRef} className="overflow-x-auto w-full">
      <table className="min-w-[700px] w-full text-left mt-4 border-collapse">
        <thead>
          <tr className="bg-[#F4F4F4] text-[#000] font-poppins font-semibold text-sm leading-normal">
            {columns.map((column, index) => (
              <React.Fragment key={index}>
                <th
                  className={`py-3 px-4 text-center whitespace-nowrap ${
                    column.bg ? column.bg : ""
                  } ${
                    column.key !== "action"
                      ? "border-r-[3px] border-r-[#F1F1F1]"
                      : ""
                  }`}
                >
                  {column.render ? column.render() : column.label}
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#333] font-poppins text-sm">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="relative">
              {columns.map((column, index) => (
                <React.Fragment key={index}>
                  <td
                    className={`py-4 px-4 text-center whitespace-nowrap ${
                      column.bg ? column.bg : ""
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
                      <TableImageRednder images={row[column.key]} />
                    ) : column.key === "inStock" ? (
                      row[column.key] === true ? (
                        <span>InStock</span>
                      ) : (
                        <span>Out Of Stock</span>
                      )
                    ) : column.key === "action" ? (
                      <button
                        className="p-2 text-[#000] font-extrabold text-2xl"
                        onClick={(event) =>
                          handleActionClick(rowIndex, event, row)
                        }
                      >
                        <CiMenuKebab />
                      </button>
                    ) : (
                      (row[column.key as keyof T] as React.ReactNode)
                    )}
                  </td>
                </React.Fragment>
              ))}

              {openDialog === rowIndex && (
                <div
                  className={`absolute right-0 z-10 ${
                    dialogPosition === "top"
                      ? "bottom-full mb-2"
                      : "top-full mt-2"
                  }`}
                >
                  <DialogBox setOpenDialog={setOpenDialog} />
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
