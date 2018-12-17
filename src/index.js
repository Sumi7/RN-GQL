const { GraphQLServer} = require('graphql-yoga')
const passport = require('passport')


if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load()
}

const { db } = require('./prisma')
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const AuthPayload = require('./resolvers/AuthPayload')
require('./services/passport');

const resolvers = {
	Query,
	Mutation,
	AuthPayload
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db
	})
})

server.express.use(passport.initialize());
server.express.use(passport.session());

server.express.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
server.express.get('/auth/google/callback', passport.authenticate('google'), (req, res) => res.send('finished auth'))

server.start({ port: 3006 }, () => console.log(`server running on port http://localhost:3006 env:(${process.env.NODE_ENV})`))