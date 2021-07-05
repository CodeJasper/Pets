const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userApi = require("../Api/UsersApi");

passport.use(
  new LocalStrategy("local", async (email, password, done) => {
    const userExists = await userApi.findUserByEmail(email);

    if (userExists === null) {
      return done(null, false, {
        message: "No hay un usuario asociado a este email.",
      });
    }

    if ((await userExists.comparePasswords(password)) === false) {
      return done(null, false, {
        message: "La contraseña es incorrecta.",
      });
    }

    return done(null, userExists);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userApi.findUserById(id);
  if (user.error) {
    done(user.error, false);
  } else {
    done(null, user);
  }
});
