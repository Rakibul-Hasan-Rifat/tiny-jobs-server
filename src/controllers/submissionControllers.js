import { submitsColl } from "../mongodb/databases.js";

export const getSubmittedTasks = async (req, res) => {
  console.log("get submitted task: ", req.user);
  res.send(
    await submitsColl.find({ "worker.email": req?.user?.email }).toArray()
  );
};

export const getSubmittedTasksByBuyer = async (req, res) => {
  const result = await submitsColl
    .find({ "buyer.email": req?.user?.email, task_status: "pending" })
    .toArray();
  res.send(result);
};

export const submitTask = async (req, res) =>
  res.send(await submitsColl.insertOne(req.body));
