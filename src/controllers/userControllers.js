import { ObjectId } from "mongodb";
import { usersColl } from "../mongodb/databases.js";

export const getUsers = async (req, res) => {
  const result = await usersColl.find().toArray();
  res.send(result);
};

export const getSingleUser = (req, res) => {};

export const postUser = async (req, res) => {
  const { name, email, role, image } = req.body;

  const doesExist = await usersColl.findOne({ email });

  console.log("existing user", doesExist);

  if (doesExist) {
    return res.send({
      success: false,
      message: `User already exists with ${email}.`,
    });
  }

  const result = await usersColl.insertOne({
    name,
    email,
    role: role || "worker",
    coin: role === "buyer" ? 50 : 10,
    image,
  });

  res.send(result);
};

export const putUser = async (req, res) => {
  const user = await usersColl.findOne({ email: req.body?.email });

  const result = await usersColl.updateOne(
    { email: req.body?.email },
    { $set: { ...user, coin: parseInt(user.coin) - parseInt(req.body?.coins) } }
  );

  res.send(result);
};

export const deleteUser = async (req, res) => {
  const result = await usersColl.deleteOne({
    _id: ObjectId.createFromHexString(req.body?.userId),
  });
  res.send(result);
};
