
const PaymentSummary = () => {
  return (
    <>
      <h1 className="text-lg font-bold  font-serif text-primary mt-4">
     Payment
      </h1>
    <div className="border border-gray-200 rounded-lg mt-2">
     
    <div className="flex flex-col px-4 py-2 gap-2">
    
         <div className="flex flex-col  gap-4">
        <label className="flex items-center gap-2 border-b border-gray-200 py-2">
          <input
            type="radio"
            name="paymentStatus"
            value="paid"
            className="accent-blue-600"
          />
          <span>Cash On Delivery</span>
        </label>

        <label className="flex items-center gap-2 border-b border-gray-200 py-2">
          <input
            type="radio"
            name="paymentStatus"
            value="unpaid"
            className="accent-blue-600"
          />
          <span>Online Payment</span>
        </label>

        <label className="flex items-center gap-2  mb-2">
          <input
            type="radio"
            name="paymentStatus"
            value="pending"
            className="accent-blue-600"
          />
          <span>Card Payment</span>
        </label>
      </div>
    </div>
  </div>
  </>
  )
}

export default PaymentSummary
