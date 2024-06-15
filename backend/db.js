import mongoose from "mongoose";

export const connection = async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log(`Got some error bro : ${err}`);
    });
};
