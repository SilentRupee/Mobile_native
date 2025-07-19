"use client"

import { ScrollView } from "react-native"
import SummaryCard from "./SummaryCard"
import { PaymentData } from "@/types/PaymentData"
import { SafeAreaView } from "react-native-safe-area-context"


interface SummaryCardsProps {
  data: PaymentData[]
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
  const totalTransactions = data.reduce((sum, item) => sum + item.transactions, 0)
  const grossRevenue = data.reduce((sum, item) => sum + item.grossPayments, 0)
  const netRevenue = data.reduce((sum, item) => sum + item.netAmount, 0)
  const totalCommission = data.reduce((sum, item) => sum + item.commission, 0)

  return (
    <SafeAreaView>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-6 py-5"
      contentContainerStyle={{ gap: 16 }}
    >
      <SummaryCard
        title="Total Transactions"
        value={totalTransactions.toString()}
        icon="bar-chart-outline"
        color="bg-blue-500"
        width="w-44"
      />
      <SummaryCard
        title="Gross Revenue"
        value={`$${grossRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon="trending-up-outline"
        color="bg-green-500"
        width="w-48"
      />
      <SummaryCard
        title="Net Revenue"
        value={`$${netRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon="cash-outline"
        color="bg-emerald-500"
        width="w-48"
      />
      <SummaryCard
        title="Total Commission"
        value={`$${totalCommission.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon="wallet-outline"
        color="bg-purple-500"
        width="w-52"
      />
    </ScrollView>
    </SafeAreaView>
  )
}

export default SummaryCards
