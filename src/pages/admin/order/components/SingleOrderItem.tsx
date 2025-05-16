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
        {selectedRow.orderItems.map((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 py-4 items-center"
          >
            <div className="col-span-6 flex items-center gap-4">
              <img
                src={item.product?.images?.[0]?.url}
                alt="Product"
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div>
                <p>{item.product?.name}</p>
              </div>
            </div>

            <div className="col-span-2 text-right">
              <p className="text-gray-800 font-medium">
                ₹{item.price.toFixed(2)}
              </p>
            </div>

            <div className="col-span-2 text-center">
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>

            <div className="col-span-2 text-right">
              <p className="font-medium">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleOrderItem;
