import { usersColl } from "../mongodb/databases.js";

export const getUserRole = async (req, res) => {
  const result = await usersColl.findOne({ email: req.params?.email });
  console.log(result);
  res.send({ role: result?.role });
};
