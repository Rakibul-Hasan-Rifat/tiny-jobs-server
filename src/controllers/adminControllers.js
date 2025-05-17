import { ObjectId } from "mongodb";
import { usersColl, withdrawsColl } from "../mongodb/databases.js";

export const getInfoForAdmin = async (req, res) => {
  const totalWorkers = await usersColl.countDocuments({ role: "worker" });
  const totalBuyers = await usersColl.countDocuments({ role: "buyer" });
  const [{ totalCoins }] = await usersColl
    .aggregate([
      {
        $group: {
          _id: null,
          totalCoins: { $sum: { $toInt: "$coin" } },
        },
      },
    ])
    .toArray();

  console.log(totalCoins);

  res.send({
    total_workers: totalWorkers,
    total_buyers: totalBuyers,
    available_coins: totalCoins,
  });
};

export const getAdminWithdraw = async (req, res) => {
  const result = await withdrawsColl
    .find({ withdraw_status: "pending" })
    .toArray();
  res.send(result);
};

export const patchWithdrawStatus = async (req, res) => {
  const result = await withdrawsColl.updateOne(
    { _id: ObjectId.createFromHexString(req.body?.withdrawId) },
    {
      $set: {
        withdraw_status: "approved",
      },
    }
  );
  res.send(result)
};
