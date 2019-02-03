import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag'
import { NunitoSans } from '../common/StyledText'
import Loader from '../common/Loader'

const GET_TASKS = gql`
  query getTasks {
	getTasks {
		id
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

const mock = JSON.parse(JSON.stringify([
	{
		"id": "cjrorxa1icwx00a257ktxzryv",
		"taskName": "first test task",
		"subTasks": [
			{
				"id": "cjrorxa1ocwx10a25bum5n7ir",
				"index": 1,
				"value": "first subtask",
				"completed": false
			}
		]
	},
	{
		"id": "cjrorygw1fhg90a85ei4v4ffl",
		"taskName": "second test task",
		"subTasks": [
			{
				"id": "cjrorygw5fhga0a85km953dbo",
				"index": 1,
				"value": "second subtask",
				"completed": false
			}
		]
	},
	{
		"id": "cjrp09vy9jfil0a855bgysz3z",
		"taskName": "second test task",
		"subTasks": [
			{
				"id": "cjrp09vydjfim0a85938dy6rw",
				"index": 1,
				"value": "second subtask",
				"completed": false
			}
		]
	}
]))

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
				query: GET_TASKS
			})
			updateTasks(tasks.getTasks)
			setLoader(false)
		} catch (e) {
			console.log(e)
			updateTasks(mock)
			setLoader(false)
		}
	}
	return (
		<ScrollView style = {{ width: '100%' }} contentContainerStyle = {styles.taskScrollWrapper } alwaysBounceVertical = { true} >
			<View style={styles.tasks}>
				{
					tasks.map( ({id, taskName, subTasks}) => {
						const completedCount = subTasks.reduce((acc, elem) => (elem.completed ? acc++ : acc), 0)
						return (
							<View style={styles.tasksRow} elevation={2} key={`task-${id}`}>
								<View style={styles.taskBorderWrapper}>
									<NunitoSans style={styles.taskName}>{taskName}</NunitoSans>
									<NunitoSans style={styles.taskStats}>{`${completedCount}/${subTasks.length} `}</NunitoSans>
								</View>
							</View>
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