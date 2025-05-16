import { useQuery } from "@tanstack/react-query";
import TableData, { Column } from "../../order/components/TableData";
import { fetchUsersQuery } from "../../../../services/queries";
import Pagination from "../../../user/products/components/Pagination";
import { CurrentUser } from "../../../../types/auth";
import { useEffect } from "react";

const OrderTable = () => {
  const itemsPerPage = 10;
  const { data: users } = useQuery(fetchUsersQuery());

  useEffect(() => {
    if (users) {
      console.log("from table", users);
    }
  }, [users]);

  const columns: Column<CurrentUser>[] = [
    { label: "UserName", key: "username" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "contact" },
    {
      label: "Orders",
      render: (row) => row.order?.length
    },
    {
      label: "Address",
      render: (row) => (
        <div className="">
          <span>{row.address?.address1 || "Address 1 not available"}</span>
          {", "}
          <span>{row.address?.street || "Street not available"}</span>
          {", "}
          <span>{row.address?.city || "City not available"}</span>
          {", "}
          <span>{row.address?.state || "State not available"}</span>
          {", "}
          <span>{row.address?.country || "Country not available"}</span>
          {", "}
        </div>
      )
    }
  ];

  return (
    <>
      <TableData<CurrentUser> columns={columns} data={users ?? []} />
      <Pagination
        totalProducts={users?.length ?? 0}
        productPerPage={itemsPerPage}
      />
    </>
  );
};

export default OrderTable;
