import express from "express";
import jwt from "jsonwebtoken";
import zod from "zod";
import { User, Account } from "../models/userSchema.js";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middleware.js";
const Router = express.Router();

const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastnane: zod.string().optional(),
});

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

Router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({ message: "Please provide correct data" });
  }

  const user = await User.findOne({
    email: body.email,
  });

  if (user) {
    return res.json({ message: "Email already taken / Incorect Inputs" });
  }

  const dbUser = await User.create(body);
  const userId = dbUser._id;

  await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
  })


  const token = jwt.sign(
    {
      userId
    },
    JWT_SECRET
  );
  res.json({ message: "User created successfully", token: token });
});

Router.post("/signin", async (req, res) => {
  const body = req.body;
  const result = signinSchema.safeParse(body);

  if (!result.success) {
    return res.send({ message: "Please provide the correct data" });
  }

  const existingUser = await User.findOne({ email: body.email });
  if (!existingUser) {
    return res.send({ message: "You need to sign up first!" });
  }

  if (body.password !== existingUser.password) {
    return res.send({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
  return res.json({ message: "Signed in successfully", token: token });
});

Router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstnme: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

Router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating informtion",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
});

export default Router;
