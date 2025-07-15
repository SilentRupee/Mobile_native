import { useState } from "react"
import { View, ScrollView, SafeAreaView } from "react-native"
import DashboardHeader from "../PaymentTableComp/DashboardHeader"
import TableBulkAction from "../PaymentTableComp/TableBulkAction"
import SummaryCards from "../PaymentTableComp/SummaryCards"
import PaymentTable from "../PaymentTableComp/PaymentTable"
import { PaymentData } from "@/types/PaymentData"


const PaymentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const paymentData: PaymentData[] = [
    {
      id: "1",
      paymentMethod: "Cash",
      creditCard: "N/A",
      salesChannel: "Point of Sale",
      transactions: 4,
      grossPayments: 265.91,
      taxAmount: 23.93,
      netAmount: 241.98,
      commission: 5.32,
      status: "Completed",
      date: "2024-01-15",
      customerName: "John Doe",
      billNumber: "BILL-001",
    },
    {
      id: "2",
      paymentMethod: "External debit",
      creditCard: "N/A",
      salesChannel: "Point of Sale",
      transactions: 10,
      grossPayments: 1682.04,
      taxAmount: 151.38,
      netAmount: 1530.66,
      commission: 33.64,
      status: "Completed",
      date: "2024-01-15",
      customerName: "Jane Smith",
      billNumber: "BILL-002",
    },
    {
      id: "3",
      paymentMethod: "Shopify Payments",
      creditCard: "N/A",
      salesChannel: "Online Store",
      transactions: 1,
      grossPayments: 0.0,
      taxAmount: 0.0,
      netAmount: 0.0,
      commission: 0.0,
      status: "Pending",
      date: "2024-01-16",
      customerName: "Mike Johnson",
      billNumber: "BILL-003",
    },
    {
      id: "4",
      paymentMethod: "Shopify Payments",
      creditCard: "N/A",
      salesChannel: "Point of Sale",
      transactions: 1,
      grossPayments: 0.0,
      taxAmount: 0.0,
      netAmount: 0.0,
      commission: 0.0,
      status: "Failed",
      date: "2024-01-16",
      customerName: "Sarah Wilson",
      billNumber: "BILL-004",
    },
    {
      id: "5",
      paymentMethod: "Shopify Payments",
      creditCard: "American Express",
      salesChannel: "Point of Sale",
      transactions: 2,
      grossPayments: 456.52,
      taxAmount: 41.09,
      netAmount: 415.43,
      commission: 9.13,
      status: "Completed",
      date: "2024-01-17",
      customerName: "Robert Brown",
      billNumber: "BILL-005",
    },
    {
      id: "6",
      paymentMethod: "Shopify Payments",
      creditCard: "Master",
      salesChannel: "Online Store",
      transactions: 1,
      grossPayments: 290.41,
      taxAmount: 26.14,
      netAmount: 264.27,
      commission: 5.81,
      status: "Completed",
      date: "2024-01-17",
      customerName: "Emily Davis",
      billNumber: "BILL-006",
    },
    {
      id: "7",
      paymentMethod: "Shopify Payments",
      creditCard: "Master",
      salesChannel: "Point of Sale",
      transactions: 4,
      grossPayments: 774.05,
      taxAmount: 69.66,
      netAmount: 704.39,
      commission: 15.48,
      status: "Completed",
      date: "2024-01-18",
      customerName: "David Miller",
      billNumber: "BILL-007",
    },
    {
      id: "8",
      paymentMethod: "Shopify Payments",
      creditCard: "Visa",
      salesChannel: "Online Store",
      transactions: 5,
      grossPayments: 513.06,
      taxAmount: 46.18,
      netAmount: 466.88,
      commission: 10.26,
      status: "Completed",
      date: "2024-01-18",
      customerName: "Lisa Anderson",
      billNumber: "BILL-008",
    },
    {
      id: "9",
      paymentMethod: "Shopify Payments",
      creditCard: "Visa",
      salesChannel: "Point of Sale",
      transactions: 13,
      grossPayments: 4095.63,
      taxAmount: 368.61,
      netAmount: 3727.02,
      commission: 81.91,
      status: "Completed",
      date: "2024-01-19",
      customerName: "Thomas Taylor",
      billNumber: "BILL-009",
    },
    {
      id: "10",
      paymentMethod: "Apple Pay",
      creditCard: "N/A",
      salesChannel: "Online Store",
      transactions: 3,
      grossPayments: 892.15,
      taxAmount: 80.29,
      netAmount: 811.86,
      commission: 17.84,
      status: "Completed",
      date: "2024-01-19",
      customerName: "Jennifer White",
      billNumber: "BILL-010",
    },
  ]

  const filteredData = paymentData.filter(
    (item) =>
      item.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creditCard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.billNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <DashboardHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SummaryCards data={filteredData} />
        <PaymentTable data={filteredData} selectedRows={selectedRows} onToggleRowSelection={toggleRowSelection} />
      </ScrollView>
      {selectedRows.length > 0 && <TableBulkAction selectedCount={selectedRows.length} />}
    </SafeAreaView>
  )
}

export default PaymentDashboard
