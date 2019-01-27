const users = async (parent, { filter}, context, info) => {
	const userFilter = filter ? filter : ""
	return await context.db.query.users({ where: { OR: [ { id_contains: userFilter }, { email_contains: userFilter } ] } })
}

const info = () => 'hi I am useless info'

module.exports = {
	users,
	info
}