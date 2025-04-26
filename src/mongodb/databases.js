import { client } from "./mongdb.config.js";

const db = client.db('tiny-job-store');

export const jobsColl = db.collection('jobs');
export const usersColl = db.collection('users');