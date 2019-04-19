import Router from "koa-router";
import passport = require("passport");

const router = new Router();

router.get("/", async ctx => {
  ctx.body = "Hello World!";
});

router.get("/test", async ctx => {
  ctx.status = 201;
  ctx.body = "test";
});

router.get("/fail", async ctx => {
  (ctx.status = 200), (ctx.body = "Failed");
});

router.get("/login", async ctx => {
  console.log(ctx.request);
  passport.authenticate("azuread-openidconnect");
});

router.post(
  "/auth/openid/return",
  passport.authenticate("azuread-openidconnect", {
    successRedirect: "/test",
    failureRedirect: "/fail"
  })
);

export const routes = router.routes();
