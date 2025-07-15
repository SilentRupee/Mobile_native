export interface PaymentData {
  id: string
  paymentMethod: string
  creditCard: string
  salesChannel: string
  transactions: number
  grossPayments: number
  taxAmount: number
  netAmount: number
  commission: number
  status: string
  date: string
  customerName: string
  billNumber: string
}
