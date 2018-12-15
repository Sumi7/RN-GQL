const { Prisma } = require('prisma-binding')

const db = new Prisma({
	typeDefs: 'database/generated/prisma.graphql',
	endpoint: 'https://eu1.prisma.sh/sumit-5fac90/db/dev',
	secret: 'mysecret123',
	debug: true
})

module.exports = { db }