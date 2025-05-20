export interface User {
  _id: string
  username: string
  role: "admin" | "owner"
  name: string
}

export interface Order {
  _id: string
  customerName: string
  products: OrderProduct[]
  totalPrice: number
  status: "Not Yet Processed" | "Being Sent" | "Completed"
  paymentStatus: "Paid" | "Not Yet Paid"
  createdAt: string
  updatedAt: string
}

export interface OrderProduct {
  productId: string
  name: string
  quantity: number
  price: number
}

export interface Stock {
  _id: string
  name: string
  quantity: number
  unit: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface SalesReport {
  month: string
  totalSales: number
  totalOrders: number
  averageOrderValue: number
}
