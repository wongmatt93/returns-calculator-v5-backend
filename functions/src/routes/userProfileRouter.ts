import express from "express";
import { getClient } from "../db";
import { Stock } from "../models/Stock";

import UserProfile from "../models/UserProfile";

const userProfileRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

userProfileRouter.get("/:uid", async (req, res) => {
  try {
    const uid: string = req.params.uid;
    const client = await getClient();
    const result = await client
      .db()
      .collection<UserProfile>("user_profiles")
      .findOne({ uid });
    res.status(200).json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.post("/", async (req, res) => {
  try {
    const newProfile: UserProfile = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .insertOne(newProfile);
    res.status(200).json(newProfile);
  } catch (err) {
    errorResponse(err, res);
  }
});

userProfileRouter.put("/stocks/:uid", async (req, res) => {
  try {
    const client = await getClient();
    const uid: string | undefined = req.params.uid;
    const newStock: Stock = req.body;
    await client
      .db()
      .collection<UserProfile>("user_profiles")
      .updateOne({ uid }, { $push: { stocks: newStock } });
    res.status(200).json(newStock);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default userProfileRouter;
