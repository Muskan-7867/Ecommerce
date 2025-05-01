import React, { useState, useRef } from "react";
import DialogBox from "./ActionDialogbox";

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

const Table = <T extends { [key: string]: unknown }>({ columns, data }: TableProps<T>) => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [dialogPosition, setDialogPosition] = useState<"top" | "bottom">("bottom");
  const tableRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (rowIndex: number, event: React.MouseEvent) => {
    // Toggle the dialog
    if (openDialog === rowIndex) {
      setOpenDialog(null);
      return;
    }

    // Get the table and button positions
    const tableRect = tableRef.current?.getBoundingClientRect();
    const buttonRect = event.currentTarget.getBoundingClientRect();

    if (tableRect && buttonRect) {
      const spaceBelow = tableRect.bottom - buttonRect.bottom;
      const spaceAbove = buttonRect.top - tableRect.top;

      // Show dialog above if there's not enough space below
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
              <th
                key={index}
                className={`py-3 px-4 text-center whitespace-nowrap ${
                  column.bg ? column.bg : ""
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
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-4 px-4 text-center whitespace-nowrap ${
                    column.bg ? column.bg : ""
                  } ${column.key !== "action" ? "border-r-[3px] border-r-[#F1F1F1]" : ""} ${
                    column.key !== "checkbox" ? "border-b border-b-[#000]" : ""
                  }`}
                >
                  {column.key === "checkbox" ? (
                    <input type="checkbox" />
                  ) : column.key === "action" ? (
                    <button
                      className="p-2 text-[#000] font-extrabold text-2xl"
                      onClick={(event) => handleActionClick(rowIndex, event)}
                    >
                      ⋮
                    </button>
                  ) : column.renderData ? (
                    column.renderData(row)
                  ) : (
                    row[column.key as keyof T] as React.ReactNode
                  )}
                </td>
              ))}
              {openDialog === rowIndex && (
                <div
                  className={`absolute right-0 z-10 ${
                    dialogPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"
                  }`}
                >
                  <DialogBox />
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
