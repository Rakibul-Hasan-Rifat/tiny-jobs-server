import { usersColl } from "../mongodb/databases.js";

export const getUserInfo = async (req, res) => {
  const result = await usersColl.findOne(
    { email: req.params?.email },
    { projection: { _id: 0, role: 1, coin: 1 } }
  );
  console.log(result);
  res.send(result);
};
