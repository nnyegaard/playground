import Koa from "koa";
import BodyParser from "koa-bodyparser";
import passport from "koa-passport";
import Router from "koa-router";
import session from "koa-session";
import { OIDCStrategy } from "passport-azure-ad";
import Axios from "axios";
import { config } from "./config";
import { logger } from "./logging";
const app = new Koa();
const router = new Router();
app.keys = ["some secret hurr"];

app.use(session({}, app));
app.use(logger);
app.use(BodyParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());

router.get("/", (ctx, next) => {
  ctx.body = "Hello world";
});

router.get("/succ", (ctx, next) => {
  ctx.body = "Succ!";
});

router.get("/fail", (ctx, next) => {
  ctx.body = "FAIL!";
});

router.get("/auth/office365", async (ctx, next) => {
  return passport.authenticate("azuread-openidconnect", {
    customState: "blabla",
    failureRedirect: "/fail"
  })(ctx, next);
});

router.post(
  "/auth/office365/callback",
  passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/fail",
    passReqToCallback: false
  }),
  async (ctx, next) => {
    console.log("we are here");
    const bla: any = ctx.req;
    console.log(bla.user);

    const result = await Axios.get("https://graph.microsoft.com/v1.0/me/", {
      headers: {
        Authorization: `Bearer ${bla.user.profile.access_token}` 
      }
    })

    console.log(result.data);

    ctx.redirect("/");
  }
);

passport.use(
  new OIDCStrategy(
    {
      identityMetadata:
        "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
      clientID: "9c86e73e-ee79-49dc-9008-aceb6c325e84",
      clientSecret: "Awg?!r1Vi3DS>c}2",
      responseType: "code",
      responseMode: "form_post",
      redirectUrl: "http://localhost:3000/auth/office365/callback",
      allowHttpForRedirectUrl: true,
      scope: ["openid", "profile", "offline_access", "User.Read", "email"],
      loggingLevel: "warn",
      validateIssuer: false
    },
    (
      iss: any,
      sub: any,
      profile: any,
      access_token: any,
      refresh_token: any,
      params: any,
      done: any

      // req, iss, sub, profile, jwtClaims, access_token, refresh_token, params, done
    ) => {
      // console.log("Passport yes!");
      // console.log("Iss: " + iss);
      // console.log("sub: " + sub);
      // console.log("AccessToken: " + access_token);
      // console.log("RefreshToken: " + refresh_token);
      // console.log("Profile: " + JSON.stringify(profile));
      // console.log("User: ", user)

      // return done(null, profile);


      return done(null, { profile: { profile, params, access_token, refresh_token } });
    }
  )
);

passport.serializeUser(function(user: any, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.listen(config.port);

console.log(`Server running on port ${config.port}`);
