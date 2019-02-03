const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../utils')

async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10)
	const user = await context.db.mutation.createUser({
		data: { ...args, password },
	})
	const jwt_data = user.admin ? { userId: user.id, admin: user.admin } : { userId: user.id }
	const token_expiry = user.admin ? { expiresIn: 86400 * 30 } : {}
	const token = jwt.sign(jwt_data, process.env.APP_SECRET, token_expiry)

	return {
		token,
		user
	}
}

async function login(parent, args, context, info) {
	const user = await context.db.query.user({ where: { email: args.email } })
	if (!user) {
		throw new Error('No such user found')
	}

	const valid = await bcrypt.compare(args.password, user.password)

	if (!valid) {
		throw new Error('Invalid password')
	}
	// 86400 * 30
	const jwt_data = user.admin ? { userId: user.id, admin: user.admin } : { userId: user.id }
	const token_expiry = user.admin ? { expiresIn: 86400 * 30 } : {}

	const token = jwt.sign(jwt_data, process.env.APP_SECRET, token_expiry)

	return {
		token,
		user,
	}
}

async function googleAuth(parent, args, context, info) {
	const { googleId, email, name } = args
	let user = await context.db.query.user({ where: { email } }, info); console.log("incoming======>", JSON.stringify(user))
	if (!user) {
		user = await context.db.mutation.createUser({
			data: {
				name: name,
				email: email,
				google: {
					create: {
						googleId
					}
				}
			}
		})
	} else if (user && user.email && !user.google.googleId) {
		user = await context.db.mutation.creategoogleAuth({
			data: {
				googleId,
				user: {
					connect: {
						id: user.id
					}
				}
			}
		})
	}

	console.log("found======>", user)
	const jwt_data = user.admin ? { userId: user.id, admin: user.admin } : { userId: user.id }
	const token_expiry = user.admin ? { expiresIn: 86400 * 30 } : {}
	const token = jwt.sign(jwt_data, process.env.APP_SECRET, token_expiry)

	return {
		token,
		user
	}
}

async function addTask(parent, { taskName, subTasks }, context, info) {
	console.log('add Task')
	const userId = await getUserId(context)
	let task
	// if(!user.tasks) {
	task = await context.db.mutation.createTask({
		data: {
			taskName,
			subTasks: {
				create: [...subTasks]
			},
			user: {
				connect: {
					id: userId
				}
			}
		}
	}, info)
	// await context.db.mutation.updateTask({ data: { subTasks }, where: { id: task.id } })
	// } else {
	// 	task = await context.db.mutation.updateTask({
	// 		data: { taskName: taskName, subTasks: subTasks }
	// 	})
	// }
	return task
}

module.exports = {
	signup,
	login,
	googleAuth,
	addTask
}