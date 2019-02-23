import gql from 'graphql-tag'

export const Queries = {
	GET_TASKS : (
		gql`
			query getTasks {
				getTasks {
					id
					taskName
					subTasks {
						index
						value
						completed
					}
				}
			}
		`
	)
}

export const Mutations = {
	ADD_TASK: (
		gql`
			mutation addTask($taskName: String!, $subTasks: [SubTasksInput]!) {
				addTask(taskName: $taskName, subTasks:$subTasks) {
					taskName
					subTasks {
						id
						index
						value
						completed
					}
				}
			}
		`
	),
	UPDATE_TASK: (
		gql`
			mutation updateTask($id: String!, $taskName: String!, $subTasks: [SubTasksInput]!) {
				updateTask(id: $id, taskName: $taskName, subTasks:$subTasks) {
					taskName
					subTasks {
						id
						index
						value
						completed
					}
				}
			}
		`
	)
}