import { submitsColl, withdrawsColl } from "../mongodb/databases.js";

export const getWithdraw = async (req, res) => {
  const submits = await submitsColl
    .find(
      { "worker.email": req?.user?.email, task_status: "pending" },
      {
        projection: {
          task_title: 1,
          payable_amount: 1,
          task_status: 1,
          "buyer.name": 1,
        },
      }
    )
    .toArray();

  const withdraws = await withdrawsColl
    .find({ "worker.email": req?.user?.email })
    .toArray();

  const withdrawTotal = withdraws.reduce(
    (total, withdraw) => total + parseInt(withdraw.widthdraw_coins),
    0
  );
  res.send({submits, withdraw_total: withdrawTotal });
};

export const postWithdraw = async (req, res) => {
  console.log("post withdraw", req.body);
  const result = await withdrawsColl.insertOne(req.body);
  res.send(result);
};
