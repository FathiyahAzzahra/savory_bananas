import mongoose from "mongoose"

interface OrderProduct {
  productId: mongoose.Types.ObjectId
  name: string
  quantity: number
  price: number
}

interface Discount {
  type: "nominal" | "percentage"
  value: number
  amount: number
}

export interface IOrder extends mongoose.Document {
  customerName: string
  products: OrderProduct[]
  totalPrice: number
  status: "Not Yet Processed" | "Being Sent" | "Completed" | "Cancelled"
  paymentStatus: "Paid" | "Debt" | "Pending Verification" | "Payment Rejected" | "Cancelled"
  paymentMethod?: "cash" | "transfer" | "debt"
  paymentProofUrl?: string
  receiptUrl?: string
  discount?: Discount
  cashReceived?: number
  change?: number
  receiptId?: string
  cancellationReason?: string
  createdAt: Date
  updatedAt: Date
}

const OrderProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
})

const DiscountSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["nominal", "percentage"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
})

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Please provide customer name"],
      trim: true,
    },
    products: {
      type: [OrderProductSchema],
      required: true,
      validate: {
        validator: (products: any[]) => products.length > 0,
        message: "Order must have at least one product",
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Not Yet Processed", "Being Sent", "Completed", "Cancelled"],
      default: "Not Yet Processed",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Debt", "Pending Verification", "Payment Rejected", "Cancelled"],
      default: "Pending Verification",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "transfer", "debt"],
    },
    paymentProofUrl: {
      type: String,
    },
    receiptUrl: {
      type: String,
    },
    discount: {
      type: DiscountSchema,
      required: false,
    },
    cashReceived: {
      type: Number,
      min: 0,
    },
    change: {
      type: Number,
      min: 0,
    },
    receiptId: {
      type: String,
      unique: true,
      sparse: true,
    },
    cancellationReason: {
      type: String,
    },
  },
  { timestamps: true },
)

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)

export default Order
