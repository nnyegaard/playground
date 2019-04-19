import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";

const app = express();
const port = 44368;

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/auth/office365", (req, res, next) => {
  console.log("We called /auth");
  console.log("req: " + JSON.stringify(req.query));

  passport.authenticate("azuread-openidconnect")(req, res, next);
});

app.post(
  "/auth/office365/callback",
  passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/fail"
  }),
  async (req, res, next) => {
    console.log("we are here");
    const bla: any = req;
    console.log(bla.user);

    res.redirect("/");
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
      redirectUrl: "http://localhost:44368/auth/office365/callback",
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
      return done(null, { profile: { profile, params } });
    }
  )
);

passport.serializeUser(function(user: any, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.listen(port, () => console.log("listen on port 3000"));
