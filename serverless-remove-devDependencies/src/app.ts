import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Router from "koa-router";

export const app = new Koa();
const router = new Router();

app.keys = ["4011BA02E51104C678C31A76A444485B38F3865E504D89C3A0A80B439BB1A237"];
app.use(BodyParser({ strict: false }));
app.use(router.routes());

router.get("/", async (ctx, next) => {
  ctx.body = "Hello world!";

  await next();
});
