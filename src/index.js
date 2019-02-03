const { GraphQLServer} = require('graphql-yoga')


if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const { db } = require('./prisma')
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
// require('./services/passport');

const resolvers = {
	Query,
	Mutation
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db
	})
})

server.express.get('/test', () => console.log("===== ===== recieved request from client ===== ====="))

server.start({ port: 3006 }, () => console.log(`server running on port http://localhost:3006 env:(${process.env.NODE_ENV})`))