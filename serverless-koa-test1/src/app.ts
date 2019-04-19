import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Router from "koa-router";
import Session from "koa-session";
const serverless = require("serverless-http");

export const app = new Koa();
const router = new Router();

app.use(Session(app));
app.use(BodyParser());
app.use(router.routes());

router.get("/", async (ctx, next) => {
  ctx.body = "Hello world!";

  await next();
});

router.get("/bla", async (ctx, next) => {
  ctx.body = "bla";

  await next();
});

const handler = serverless(app);
module.exports.handler = async (event: any, context: any) => {
  return await handler(event, context);
};
