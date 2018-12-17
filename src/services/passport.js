const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { db } = require('../prisma')

const info = `{ 
  id 
  email 
  password 
  google { 
    googleId 
  } 
}`

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  console.log(JSON.stringify(db, getCircularReplacer()))
	const user = await db.query.user({ where: { id } }, info).then( user => done(null, user))
})

passport.use(new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const userData = await db.query.user({ where: { email: profile.emails[0].value } }, info)
      if (userData && userData.email && userData.google.googleId) {
        return done(null, userData)
      } else if (userData && userData.email && !userData.google.googleId) { // signed up but google auth first time
        const user = await db.mutation.creategoogleAuth({
          data: {
            googleId: profile.id,
            user: {
              connect: {
                id: userData.id
              }
            }
          }
        })
        done(null, user)
      } else { //create new User
        const user = await db.mutation.createUser({
          data: {
            name: profile.displayName,
            email: profile.emails[0].value,
            google: {
              create: {
                googleId: profile.id
              }
            }
          }
        })
        done(null, user)
      }
    }
  )
)

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};