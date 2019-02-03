const { Prisma } = require('prisma-binding')

const db = new Prisma({
	typeDefs: 'database/generated/prisma.graphql',
	endpoint: 'https://eu1.prisma.sh/sumit-5fac90/db/dev',
	secret: process.env.DB_SECRET,
	debug: true
})

module.exports = { db }