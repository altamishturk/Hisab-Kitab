import dayjs from "dayjs";

type Sale = {
  amount: number
  date: string
  description: string
  cashHolder: "you" | "partner" | "both"
  note?: string
  amountPartnerHold: number
  paymentMode: "offline" | "online"
  amountYouHold: number
}

type Props = {
  sales: Sale[]
}

export default function SalesSplit({ sales }: Props) {

  const yourSales = sales.filter(s => s.cashHolder === "you" || s.cashHolder === "both")
  const partnerSales = sales.filter(s => s.cashHolder === "partner" || s.cashHolder === "both")

  const yourTotal = yourSales.reduce((sum, s) => sum + (s.cashHolder === "both"? s.amountYouHold:s.amount), 0)
  const partnerTotal = partnerSales.reduce((sum, s) => sum + (s.cashHolder === "both"? s.amountPartnerHold:s.amount), 0)

  const grandTotal = yourTotal + partnerTotal;

  return (
    <div className="w-full mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* YOUR SALES */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Your Sales</h2>

          <div className="space-y-2">
            {yourSales.map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded p-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{s.description}</span>
                  <span className="text-xs text-gray-500">
                    {dayjs(s.date).format("DD MMM YYYY")}
                  </span>
                </div>

                <span className="font-semibold text-green-600">
                  ₹{s.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-green-600">₹{yourTotal}</span>
          </div>
        </div>


        {/* PARTNER SALES */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Partner Sales</h2>

          <div className="space-y-2">
            {partnerSales.map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded p-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{s.description}</span>
                  <span className="text-xs text-gray-500">
                    {dayjs(s.date).format("DD MMM YYYY")}
                  </span>
                </div>

                <span className="font-semibold text-green-600">
                  ₹{s.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-green-600">₹{partnerTotal}</span>
          </div>
        </div>

      </div>

      {/* GRAND TOTAL */}
      <div className="mt-6 bg-green-700 text-white rounded-lg p-4 flex justify-between text-lg font-semibold">
        <span>Total Sales</span>
        <span>₹{grandTotal}</span>
      </div>

    </div>
  )
}