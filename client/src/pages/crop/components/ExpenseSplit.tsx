import dayjs from "dayjs";

type Expense = {
  amount: number
  date: string
  description: string
  initialPayer: "you" | "partner" | "both"
  note?: string
  partnerPaid: number
  paymentMode: "offline" | "online"
  youPaid: number
}

type Props = {
  expenses: Expense[]
}

export default function ExpenseSplit({ expenses }: Props) {

  const yourExpenses = expenses.filter(e => e.initialPayer === "you" || e.initialPayer === "both");
  const partnerExpenses = expenses.filter(e => e.initialPayer === "partner" || e.initialPayer === "both");

  const yourTotal = yourExpenses.reduce((sum, e) => sum + (e.initialPayer === "both"? e.youPaid:e.amount), 0);
  const partnerTotal = partnerExpenses.reduce((sum, e) => sum + (e.initialPayer === "both"? e.partnerPaid:e.amount), 0);

  const grandTotal = yourTotal + partnerTotal;

  return (
    <div className="w-full mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* YOUR EXPENSES */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Your Expenses</h2>

          <div className="space-y-2">
            {yourExpenses.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded p-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{e.description}</span>
                  <span className="text-xs text-gray-500">
                    {dayjs(e.date).format("DD MMM YYYY")}
                  </span>
                </div>

                <span className="font-semibold">₹{e.initialPayer === "both"? e.youPaid:e.amount}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{yourTotal}</span>
          </div>
        </div>

        {/* PARTNER EXPENSES */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Partner Expenses</h2>

          <div className="space-y-2">
            {partnerExpenses.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded p-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{e.description}</span>
                  <span className="text-xs text-gray-500">
                    {dayjs(e.date).format("DD MMM YYYY")}
                  </span>
                </div>

                <span className="font-semibold">₹{e.initialPayer === "both"? e.partnerPaid:e.amount}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{partnerTotal}</span>
          </div>
        </div>
      </div>

      {/* GRAND TOTAL */}
      <div className="mt-6 bg-gray-900 text-white rounded-lg p-4 flex justify-between text-lg font-semibold">
        <span>Total Spent</span>
        <span>₹{grandTotal}</span>
      </div>

    </div>
  )
}