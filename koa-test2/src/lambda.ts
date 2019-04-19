import serverless from "serverless-http";
import { app } from "./app";

const handler = serverless(app);
export const catchAll = async (event: any, context: any) => {
  return await handler(event, context);
};
