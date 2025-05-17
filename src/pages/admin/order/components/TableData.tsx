import React, { useRef, useState } from "react";
import DialogBox from "../../../../components/common/admin/ActionDialogbox";
import { CiMenuKebab } from "react-icons/ci"; 
import { useSingleOrderStore } from "../../../../store/product/Table.store";

export interface Column<T> {
  label: string | React.ReactNode;
  key?: keyof T | "action";
  render?: (item: T) => React.ReactNode;
  renderData?: (
    item: T,
    index: number,
    handleActionClick?: (
      rowIndex: number,
      event: React.MouseEvent,
      row: T
    ) => void
  ) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

function TableData<T>({ columns, data }: TableProps<T>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [dialogPosition, setDialogPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const { setSelectedRow } = useSingleOrderStore();

  const handleActionClick = (
    rowIndex: number,
    event: React.MouseEvent,
    row: T
  ) => {
    setSelectedRow(row);

    if (openDialog === rowIndex) {
      setOpenDialog(null);
      return;
    }

    const tableRect = tableRef.current?.getBoundingClientRect();
    const buttonRect = event.currentTarget.getBoundingClientRect();

    if (tableRect && buttonRect) {
      const spaceBelow = tableRect.bottom - buttonRect.bottom;
      const spaceAbove = buttonRect.top - tableRect.top;

      setDialogPosition(
        spaceBelow < 500 && spaceAbove > 150 ? "top" : "bottom"
      );
    }

    setOpenDialog(rowIndex);
  };

  return (
    <div
      ref={tableRef}
      className="overflow-x-auto w-full h-[40rem] relative scrollbar-hide"
    >
      <table className="min-w-[700px] w-full text-left mt-4 ">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="py-3 px-4 text-start text-gray-700 font-semibold text-sm border-b border-gray-300"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition-colors duration-150 relative"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="py-4 px-4 text-start align-top whitespace-normal border-b border-r border-gray-200"
                >
                  {col.renderData ? (
                    col.renderData(item, idx, handleActionClick)
                  ) : col.render ? (
                    col.render(item)
                  ) : col.key === "action" ? (
                    <button
                      className="p-2 text-[#000] font-extrabold text-2xl"
                      onClick={(event) => handleActionClick(idx, event, item)}
                    >
                      <CiMenuKebab />
                    </button>
                  ) : col.key ? (
                    String(item[col.key as keyof T])
                  ) : (
                    ""
                  )}
                  {/* Render DialogBox inside the action cell */}
                  {col.key === "action" && openDialog === idx && (
                    <div
                      className={`absolute right-0 z-10 ${
                        dialogPosition === "top"
                          ? "bottom-full mb-2"
                          : "top-full mt-2"
                      }`}
                    >
                      <DialogBox setOpenDialog={setOpenDialog} row={item} />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
