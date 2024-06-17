import mongoose from "mongoose";

export const connection = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/paytm")
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log(`Got some error bro : ${err}`);
    });
};
