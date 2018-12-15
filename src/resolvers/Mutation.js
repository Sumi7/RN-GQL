const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const APP_SECRET = "mysecret"

async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10)
	const user = await context.db.mutation.createUser({
		data: { ...args, password },
	})

	const token = jwt.sign({ userId: user.id }, APP_SECRET, {
		expiresIn: 86400 * 30
	})

	return {
		token,
		user
	}
}

module.exports = {
	signup
}