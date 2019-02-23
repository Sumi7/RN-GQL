const { getUserId } = require('../utils')

const users = async (parent, { filter}, context, info) => {
	const userFilter = filter ? filter : ""
	return await context.db.query.users({ where: { OR: [ { id_contains: userFilter }, { email_contains: userFilter } ] } })
}

const getTasks = async (parent, args, context, info) => {
	const userId = await getUserId(context)

	return await context.db.query.tasks({ where: { user: { id: userId} } }, info)
}

const searchUsers = async (parent, {user}, context, info) => {
	const userId = await getUserId(context)
	const where = user
		? { OR: [{ name_contains: user }, { email_contains: user }] }
		: {}
	return await context.db.query.users({ where }, info)
}

module.exports = {
	users,
	getTasks,
	searchUsers
}