interface PaymentSummaryProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <>
      <h1 className="text-lg font-bold font-serif text-primary mt-4">
        Payment
      </h1>
      <div className="border border-gray-200 rounded-lg mt-2">
        <div className="flex flex-col px-4 py-2 gap-2">
          <div className="flex flex-col gap-4">
            {["Cash On Delivery", "Online Payment", "Card Payment"].map((label) => {
              const value = label.toLowerCase().replace(/\s/g, "_");
              return (
                <label
                  key={value}
                  className="flex items-center gap-2 border-b border-gray-200 py-2"
                >
                  <input
                    type="radio"
                    name="paymentStatus"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="accent-primary w-4 h-4  rounded-full cursor-pointer"
                  />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSummary;
