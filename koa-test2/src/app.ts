import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Passport from "koa-passport";
import Router from "koa-router";
import session from "koa-session";
import { OIDCStrategy } from "passport-azure-ad";

export const app = new Koa();
const router = new Router();

app.keys = ["some secret hurr"];

const CONFIG = {
  key: "koa:sess" /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: false /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));
app.use(BodyParser({strict: false }));

app.use(Passport.initialize());
app.use(Passport.session());
app.use(router.routes());

router.get("/", async (ctx, next) => {
  ctx.body = "Hello world";
});

router.get("/succ", async (ctx, next) => {
  ctx.body = "Succ!";
});

router.get("/fail", async (ctx, next) => {
  ctx.body = "Fail!";
});

// router.get("/auth/office365", async (ctx, next) => {
//     // const res: any = ctx.response;
//     // res.cookie = function (name: any, value: any, params: any) { ctx.cookies.set(name, value, params) };
//     ctx.cookie = function (name: any, value: any, params: any) { ctx.cookies.set(name, value, params) };
//   await Passport.authenticate("azuread-openidconnect", {
//     customState: "blalbla",
//     failureRedirect: "/fail", 
//     session: false,
//     response: ctx
//   })(ctx, next);
// });

router.get("/o", async (ctx, next) => {
    await next();
    await Passport.authenticate("azuread-openidconnect")(ctx, next);
})

router.post(
  "/auth/office365/callback",
  Passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/dev/fail",
    successRedirect: "/dev/succ"
  })
);

Passport.use(
  new OIDCStrategy(
    {
      identityMetadata:
        "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
      clientID: "9c86e73e-ee79-49dc-9008-aceb6c325e84",
      clientSecret: "Awg?!r1Vi3DS>c}2",
      responseType: "code",
      responseMode: "form_post",
      redirectUrl:
        "https://o1gc8cydm4.execute-api.eu-west-1.amazonaws.com/dev/auth/office365/callback", //"http://localhost:44368/auth/office365/callback",
      allowHttpForRedirectUrl: true,
      scope: ["openid", "profile", "offline_access", "User.Read", "email"],
      loggingLevel: "info",
      validateIssuer: false,
      nonceLifetime: 600, // state/nonce cookie expiration in seconds
      nonceMaxAmount: 5, // max amount of state/nonce cookie you want to keep (cookie is deleted after validation so this can be very small)
      useCookieInsteadOfSession: false,
      cookieEncryptionKeys: [
        { key: "12345678901234567890123456789012", iv: "123456789012" }
      ]
    },
    (
      iss: any,
      sub: any,
      profile: any,
      access_token: any,
      refresh_token: any,
      params: any,
      done: any
    ) => {
        console.log(profile)
        console.log(params)
      return done(null, { profile: { profile, params } });
    }
  )
);

Passport.serializeUser(function(user: any, done) {
  done(null, user);
});

Passport.deserializeUser(function(user, done) {
  done(null, user);
});


