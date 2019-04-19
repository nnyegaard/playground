import passport from "koa-passport";
import * as office365 from "passport-azure-ad";
import { VerifyCallback } from "passport-azure-ad";

passport.serializeUser(function(user: any, done: any) {
  done(null, user.id);
});

passport.use(
  new office365.OIDCStrategy(
    {
      identityMetadata:
        "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
      clientID: "9c86e73e-ee79-49dc-9008-aceb6c325e84",
      clientSecret: "Awg?!r1Vi3DS>c}2",
      responseType: "id_token code",
      responseMode: "form_post",
      redirectUrl: "http://localhost:3000/auth/openid/return",
      allowHttpForRedirectUrl: true,
      validateIssuer: false,
      scope: ["openid", "profile", "offline_access"]
    },
    (req: any, profile: office365.IProfile, done: VerifyCallback) => {
      console.log("Req: ");
      console.log(req);

      console.log("Profile: ");
      console.log(profile);

      done(profile);
    }
  )
);
