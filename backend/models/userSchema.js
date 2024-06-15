import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
    minLength: [3, "Username can't be less than 3 Characters"],
    maxLength: [30, "Username can't be more than 30 Characters"],
  },

  last_name: {
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
    minLength: [8, "Password can't be less than 8 Characters"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
