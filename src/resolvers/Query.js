const { getUserId } = require('../utils')

const users = async (parent, { filter}, context, info) => {
	const userFilter = filter ? filter : ""
	return await context.db.query.users({ where: { OR: [ { id_contains: userFilter }, { email_contains: userFilter } ] } })
}

const getTasks = async (parent, args, context, info) => {
	const userId = await getUserId(context)

	return await context.db.query.tasks({ where: { user: { id: userId} } }, info)
}

module.exports = {
	users,
	getTasks
}