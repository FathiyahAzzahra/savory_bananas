export interface User {
  _id: string
  username: string
  role: "admin" | "owner"
  name: string
  email?: string
  phone?: string
  profileImageUrl?: string
}

export interface Order {
  _id: string
  customerName: string
  products: OrderProduct[]
  totalPrice: number
  status: "Not Yet Processed" | "Being Sent" | "Completed" | "Cancelled"
  paymentStatus: "Paid" | "Debt" | "Pending Verification" | "Payment Rejected" | "Cancelled"
  paymentMethod?: "cash" | "transfer" | "debt"
  paymentProofUrl?: string
  receiptUrl?: string
  discount?: {
    type: "nominal" | "percentage"
    value: number
    amount: number
  }
  cashReceived?: number
  change?: number
  receiptId?: string
  cancellationReason?: string
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
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface SalesReport {
  month: string
  totalSales: number
  totalOrders: number
  averageOrderValue: number
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  stock: number
  imageUrl?: string
}

export interface Receipt {
  _id: string
  receiptId: string
  orderId: string
  customerName: string
  products: OrderProduct[]
  subtotal: number
  discount?: {
    type: "nominal" | "percentage"
    value: number
    amount: number
  }
  total: number
  paymentMethod: string
  cashReceived?: number
  change?: number
  cashier: string
  createdAt: string
}
