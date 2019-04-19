import express from "express";
import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";
import { creds } from "./config";
import bodyParser from "body-parser";
import expressSession  from "express-session";
import cookieParser from "cookie-parser";

var users: any = [];

var findByOid = function(oid: any, fn: any) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    console.log("we are using user: ", user);
    if (user.oid === oid) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};

passport.use(
  new OIDCStrategy(
    {
      identityMetadata: creds.identityMetadata,
      clientID: creds.clientID,
      responseType: "id_token code",
      responseMode: "form_post",
      redirectUrl: creds.redirectUrl,
      allowHttpForRedirectUrl: creds.allowHttpForRedirectUrl,
      clientSecret: creds.clientSecret,
      validateIssuer: creds.validateIssuer,
      isB2C: false,
      // issuer: creds.issuer,
      // passReqToCallback: false,
      scope: creds.scope,
      loggingLevel: "info",
      // nonceLifetime: creds.nonceLifetime,
      // nonceMaxAmount: creds.nonceMaxAmount,
      useCookieInsteadOfSession: creds.useCookieInsteadOfSession
      // cookieEncryptionKeys: creds.cookieEncryptionKeys,
      // clockSkew: creds.clockSkew,
    },
    function(
      iss: any,
      sub: any,
      profile: any,
      accessToken: any,
      refreshToken: any,
      done: any
    ) {
        console.log("INFO: We are in passport")
      if (!profile.oid) {
        return done(new Error("No oid found"), null);
      }
      // asynchronous verification, for effect...
      process.nextTick(function() {
        findByOid(profile.oid, function(err: any, user: any) {
          if (err) {
              console.log("ERROR: Error in passport")
            return done(err);
          }
          if (!user) {
              console.log("INFO: NO USER")
            // "Auto-registration"
            users.push(profile);
            return done(null, profile);
          }

          console.log("Process nextTick user: ");
          console.log(user);
          return done(null, user);
        });
      });
    }
  )
);

const app = express();
app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login',
  function(req, res, next) {
    console.log("We called /login")
    console.log("req: " + JSON.stringify(req.query))
    // gbRedirectUrl = req.query.gbRedirectUrl;
    
    passport.authenticate('azuread-openidconnect', {
        failureRedirect: "https://google.com/?failure=true"
    }
    )(req, res, next);
  });


  app.post('/auth/openid/return',
  function(req, res, next) {
      console.log("INFO: Yep here")
    console.log(req.body);
    passport.authenticate('azuread-openidconnect', {
        failureRedirect: "/error"
    }

    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    console.log(Object.keys(req));
    // console.log("domain ", req.domain)
    console.log("headers ", req.headers)
    console.log("url ", req.url)
    console.log("params ", req.params)
    console.log("orignial url ", req.originalUrl)
    // console.log("secrect ", req.secret)
    console.log("user ", req.user)

    console.log("Req: ")
    console.log(req.body)
    res.redirect(req.body.state + "?user_id=5619&token=a2211971f107f617802ccf4610ab8bf7fbb4862d559d3ac5ffe050eb65fa0703&uuid=6e9bd7ac-6908-4328-93e5-8bcb35b241b4"); //http://localhost:8080/#/new_sign_in&auth=yay
  });

  app.listen(3000);