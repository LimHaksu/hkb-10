import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import UserDAO from "../daos/UserDAO";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        // 이 부분에선 저장되어 있는 User를 비교하면 된다.
        return UserDAO.loginUser(id, password)
          .then((userId) => {
            if (!userId) {
              return done(null, false, { message: "Incorrect id or password" });
            }
            return done(null, userId, { message: "Logged In Successfully" });
          })
          .catch((error) => done(error));
      }
    )
  );

  // JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        return UserDAO.findUserById(jwtPayload.user)
          .then((userId) => {
            return done(null, userId);
          })
          .catch((error) => {
            return done(error);
          });
      }
    )
  );
};
