import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    profileImageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "owner"],
      default: "owner",
    },
  },
  { timestamps: true },
)

// Hash password before saving
userSchema.pre("save", async function (this: any, next: any) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Delete existing model to avoid OverwriteModelError
delete mongoose.models.User

export default mongoose.model("User", userSchema)