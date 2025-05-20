import mongoose, { type Document, type Model } from "mongoose"

interface OrderProduct {
  productId: mongoose.Types.ObjectId
  name: string
  quantity: number
  price: number
}

export interface IOrder extends Document {
  customerName: string
  products: OrderProduct[]
  totalPrice: number
  status: "Not Yet Processed" | "Being Sent" | "Completed"
  paymentStatus: "Paid" | "Not Yet Paid"
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
      enum: ["Not Yet Processed", "Being Sent", "Completed"],
      default: "Not Yet Processed",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Not Yet Paid"],
      default: "Not Yet Paid",
    },
  },
  { timestamps: true },
)

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)

export default Order
