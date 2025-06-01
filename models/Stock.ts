import mongoose from "mongoose"

export interface IStock extends mongoose.Document {
  name: string
  quantity: number
  unit: string
  price: number
  imageUrl?: string
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
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true },
)

const Stock = mongoose.models.Stock || mongoose.model<IStock>("Stock", StockSchema)

export default Stock
