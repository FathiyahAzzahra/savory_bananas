import mongoose, { type Document, type Model } from "mongoose"

export interface IStock extends Document {
  name: string
  quantity: number
  unit: string
  price: number
  createdAt: Date
  updatedAt: Date
}

const StockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide item name"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
)

const Stock: Model<IStock> = mongoose.models.Stock || mongoose.model<IStock>("Stock", StockSchema)

export default Stock
