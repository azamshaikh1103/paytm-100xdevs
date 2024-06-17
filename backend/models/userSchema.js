import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    minLength: [3, "Username can't be less than 3 Characters"],
    maxLength: [30, "Username can't be more than 30 Characters"],
  },

  lastname: {
    type: String,
    require: true,
    minLength: [3, "Username can't be less than 3 Characters"],
    maxLength: [30, "Username can't be more than 30 Characters"],
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },

  password: {
    type: String,
    require: true,
    minLength: [6, "Password can't be less than 6 Characters"],
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

export { Account, User };
