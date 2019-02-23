import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { withApollo } from 'react-apollo'

import { NunitoSans } from '../../common/StyledText'
import { Queries } from '../operations'
import mock from '../operations/mock'
import Loader from '../../common/Loader'

const TaskContainer = (props) => {
	const [tasks, updateTasks] = useState([])
	const [loading, setLoader] = useState(false)

	useEffect(() => {
		fetchTasks()
	}, [tasks])
	
	async function fetchTasks() {
		setLoader(true)
		try {
			const {data: tasks} = await props.client.query({
				query: Queries.GET_TASKS
			})
			setLoader(false)
			updateTasks(tasks.getTasks)
		} catch (e) {
			console.log(e)
			if (__DEV__) {
				updateTasks(JSON.parse(mock))
			}
			setLoader(false)
		}
		setLoader(false)
	}
	return (
		<ScrollView style = {{ width: '100%' }} contentContainerStyle = {styles.taskScrollWrapper } alwaysBounceVertical = { true} >
			<View style={styles.tasks}>
				{
					tasks.map(({ id, taskName, subTasks }) => {
						const completedCount = subTasks.reduce((acc, elem) => (elem.completed ? ++acc : acc), 0)
						return (
							<TouchableOpacity key={`task-${id}`} onPress={() => props.updateTask({ id, taskName, subTasks })}>
								<View style={styles.tasksRow} elevation={2} >
									<View style={styles.taskBorderWrapper}>
										<NunitoSans style={styles.taskName}>{taskName}</NunitoSans>
										<NunitoSans style={styles.taskStats}>{`${completedCount}/${subTasks.length}`}</NunitoSans>
									</View>
								</View>
							</TouchableOpacity>
						)
					}) 
				}
				<Loader visible={loading} color='#000'/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	taskScrollWrapper: {
		backgroundColor: '#fff',
		paddingVertical: 15,
		paddingHorizontal: 10,
		width: '100%',
		flexDirection: 'column'
	},
	tasks: {
		flexGrow: 1,
		display: 'flex',
		width: '100%',
		alignSelf: 'center',
	},
	tasksRow: {
		display: 'flex',
		backgroundColor:'#fff',
		marginBottom: 5,
		padding: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46
	},
	taskBorderWrapper: {
		borderLeftWidth: 8,
		borderColor: '#000',
		paddingHorizontal: 12,
		paddingVertical: 7,
		display: 'flex',
		textAlign: 'left',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	taskName: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000'
	},
	taskStats: { 
		...this.taskName ,
		fontWeight: '400',
		color: '#7b7b7b'
	}
})


export default withApollo(TaskContainer)