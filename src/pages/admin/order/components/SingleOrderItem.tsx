import { Order } from "../../../../types/order";

interface Props {
  selectedRow: Order;
}

const SingleOrderItem = ({ selectedRow }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-700 border-b pb-2">
        Products
      </h3>
      <div className="divide-y">
        {selectedRow.orderItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 py-4 items-center text-sm"
          >
            <div className="col-span-4 flex items-center gap-3 truncate">
              <img
                src={item.product?.images?.[0]?.url}
                alt="Product"
                className="w-12 h-12 object-cover rounded-md border"
              />
              <span className="truncate">{item.product?.name}</span>
            </div>

            <div className="col-span-2 text-center">
              <span>₹{item.price.toFixed(2)}</span>
            </div>

            <div className="col-span-1 text-center">
              <span>Qty:{item.quantity}</span>
            </div>

            <div className="col-span-2 text-center">
              <span>
                ₹{item?.product?.deliveryCharges?.toFixed(2) || "0.00"}
              </span>
            </div>

            <div className="col-span-3 text-right">
              <span>
                ₹{(item.price * item.quantity + item.product?.deliveryCharges).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleOrderItem;
