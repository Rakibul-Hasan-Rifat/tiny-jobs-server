import { usersColl } from "../mongodb/databases.js";

export const getUsers = (req, res) => {};

export const getSingleUser = (req, res) => {};

export const postUser = async (req, res) => {
    const { name, email, role, image } = req.body;

    const doesExist = await usersColl.findOne({ email });

    console.log('existing user', doesExist);

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

    res.send(result)
};