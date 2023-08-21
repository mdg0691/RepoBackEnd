import passport from "passport";
import config from "./config.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GibHubStrategy } from "passport-github2";
import { Strategy as GmailStrategy } from "passport-google-oauth20";
import { usersService } from "../services/users.service.js";
import { compereData } from "../utils/bcryp.js";


//Estrategia passport Local

// passport.use(
//   "login",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       try {
//         const user  = await usersService.findOneUser({ email });
//         console.log(user)
//         if (!user) {
//           return done(null, false);
//         }
        
//         const isPasswordValid = await compereData(password, user.password);

//         if (!isPasswordValid) {
//           console.log('password no valid')
//           return done(null, false);
//         }
//         done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );


// gmail
passport.use(
  "googleSignup",
  new GmailStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: "http://localhost:8080/api/auth/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json;
      console.log('email')
      console.log(profile)

      try {
        const userDB = await usersService.findOneUser({ email });
        console.log('1');
        console.log(userDB);
        if (userDB) {
          return done(null, userDB);
        }
        const user = {
          first_name: name !== null ? (name.split(' ')[0] || '') : '',
          last_name: name !== null ? (name.split(' ')[1] || '') : '',
          email : email,
          password: " ",
        };
        console.log('2');
        console.log(user);
        const newUserDB = await userModel.create(user);
        done(null, newUserDB);
      } catch (error) {
        done(error);
      }
    }
  )
);
/////
passport.use(
    "githubSignup",
    new GibHubStrategy(
      {
        clientID: "Iv1.f014454e10871dec",
        clientSecret: "9171dcd01e6fd3ddc18aef88ecb3aadcfee3811f",
        callbackURL: "http://localhost:8080/api/auth/github",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const { name, email } = profile._json;
        console.log(email);
  
        try {
          const userDB = await usersService.findOneUser({ email });
          console.log("userDb");
          console.log(userDB);
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
          const newUserDB = await usersService.createOneUser(user);
          done(null, newUserDB);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      console.log("esto es una prueba")
      console.log(id)
      const user = await usersService.findOneById(id)
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  