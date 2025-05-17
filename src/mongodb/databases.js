import { client } from "./mongdb.config.js";

const db = client.db('tiny-job-store');

export const tasksColl = db.collection('tasks');
export const usersColl = db.collection('users');
export const submitsColl = db.collection('submits');
export const withdrawsColl = db.collection('withdraws');