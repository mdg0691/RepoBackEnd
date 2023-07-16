import passport from "passport";
import { userModel } from "../DB/mongoDB/models/User.js";
import { Strategy as LocalStrategy } from "passport-local"; // renombro con as , para diferenciar los diferentes strategies
import { compereData } from "./bcrypt.js";
import { Strategy as GibHubStrategy } from "passport-github2";

//Estrategia passport Local

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        console.log(user)
        if (!user) {
          return done(null, false);
        }
        
        const isPasswordValid = await compereData(password, user.password);

        if (!isPasswordValid) {
          console.log('password no valid')
          return done(null, false);

        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Estrategia Github

//localhost:4000/api/session

passport.use(
  "githubSignup",
  new GibHubStrategy(
    {
      clientID: "Iv1.f014454e10871dec",
      clientSecret: "9171dcd01e6fd3ddc18aef88ecb3aadcfee3811f",
      callbackURL: "http://localhost:4000/api/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const { name, email } = profile._json;
      console.log(profile);

      try {
        const userDB = await userModel.findOne({ email });
        if (userDB) {
          return done(null, userDB);
        }
        const user = {
          first_name: name !== null ? (name.split(' ')[0] || '') : '',
          last_name: name !== null ? (name.split(' ')[1] || '') : '',
          email : email,
          password: " ",
        };
        console.log(user);
        const newUserDB = await userModel.create(user);
        done(null, newUserDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
