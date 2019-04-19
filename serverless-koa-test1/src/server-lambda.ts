const serverless = require("serverless-http");
import { app } from "./app";

const handler = serverless(app);
module.exports.handler = async (event: any, context: any) => {
  return await handler(event, context);
};
