import { ObjectId } from "mongodb";
import { tasksColl, usersColl } from "../mongodb/databases.js";

export const getTasksForAdmin = async (req, res) => {
  const result = await tasksColl.find({}).toArray();
  res.send(result);
};

export const getTasksForBuyer = async (req, res) => {
  console.log("buyer tasks", req.user.email);
  const result = await tasksColl
    .find({ "buyer.email": req?.user?.email })
    .toArray();
  res.send(result);
};

export const getTasksForWorker = async (req, res) => {
  const result = await tasksColl
    .find({
      $expr: {
        $gt: [{ $toDouble: "$task_workers_count" }, 0],
      },
    })
    .toArray();
  console.log(result);
  res.send(result);
};

export const postTask = async (req, res) => {
  console.log("task control", req.body);

  const { buyer, task_payable_amount, task_workers_count } = req.body;
  const totalRequiredAmount = task_payable_amount * task_workers_count;

  const user = await usersColl.findOne({ email: buyer?.email });

  console.log(user?.coin, totalRequiredAmount);

  if (totalRequiredAmount > user?.coin) {
    return res.send({ message: "Not available Coin. Purchase Coin" });
  }

  const result = await tasksColl.insertOne(req.body);
  console.log(result);
  if (result.acknowledged) {
    const updateResult = await usersColl.updateOne(
      { email: buyer?.email },
      { $set: { ...user, coin: user.coin - totalRequiredAmount } }
    );

    res.send({ ...result, ...updateResult });
  }
};

export const deleteTask = async (req, res) => {
  const result = await tasksColl.deleteOne({
    _id: ObjectId.createFromHexString(req.body?.taskId),
  });
  res.send(result);
};

export const getSingleTask = async (req, res) => {
  const { taskId } = req.params;
  const taskDetails = await tasksColl.findOne({
    _id: ObjectId.createFromHexString(taskId),
  });
  res.send(taskDetails);
};

export const deleteSingleTask = async (req, res) => {
  const { taskId } = req.params;
  const result = await tasksColl.deleteOne({
    _id: ObjectId.createFromHexString(taskId),
  });
  res.send(result);
};
