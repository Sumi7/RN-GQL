import React, { Component } from 'react'
import { View, TouchableHighlight, StyleSheet, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import gql from 'graphql-tag'
// import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql'
import { Mutation, Query, ApolloConsumer, } from 'react-apollo'
import CreateCard from './create'

const ADD_TASKS = gql`
	query addTask($taskName: String!, $subTasks: [SubTasksInput]!) {
		addTask(taskName: $taskName, subTasks:$subTasks) {
			email
		}
	}
`

class AddButton extends Component {
	constructor() {
		super()

		this.state = {
			taskName: '',
			subTasks: []
		}
	}

	addSubtask = () => {
		const defaultSubTaskValues = {
			id: this.state.subTasks.length + 1,
			value: '',
			completed: false
		}

		this.setState(prevState => (
			{ subTasks: [...prevState.subTasks, defaultSubTaskValues] }
		))
	}

	onSubTaskChange = (updatedStData) => {
		this.setState(prevState => (
			{
				subTasks: prevState.subTasks.map(st => {
					if (st.id = updatedStData.id) {
						return { ...st, ...updatedStData }
					}
					return st
				})
			}
		))
	}

	onAddButtonPress = (client) => {
		return
		const { taskName, subTasks } =this.state
		const { extendButton } = this.props
		if(extendButton) {
			client.mutate({
				mutation: ADD_TASKS,
				variables: {
					taskName,
					subTasks
				}
			})
		}
		this.props.onPressHandler(!extendButton)
	}
	render() {
		const { extendButton } = this.props
		return (
			<View style={{ ...styles.mainWrapper, ...!extendButton ? styles.wrapperNonExtended : {} }}>
				{
					extendButton && (
						<View style={{ ...styles.cardContent }}> 
							<CreateCard 
								taskName={this.state.taskName}
								setTaskName={ taskName => this.setState({taskName})}
								subTasks={this.state.subTasks}
								onSubTaskChange={this.onSubTaskChange}
								addSubtask={this.addSubtask}
							/>
						</View>
					)
				}
				<View style={{ ...styles.buttonWrapper, ...extendButton ? styles.extendedButtonWrapper : {} }}>
					<ApolloConsumer>						
						{ client => (
							<TouchableHighlight onPress={() => this.onAddButtonPress(client)} style={{...styles.button, ...extendButton ? styles.extendedButton : {} }} activeOpacity={10} underlayColor="#00D8B6" >
								<MaterialCommunityIcons name="plus" size={30} color="#fff" />
							</TouchableHighlight>
						)}
					</ApolloConsumer>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		width: '100%',
		backgroundColor: '#000',
	},
	wrapperNonExtended: {
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 50,
		overflow: 'hidden',
	},
	cardContent: {
		flex: 1
	},
	buttonWrapper: {
		backgroundColor: '#fff',
		width: 60,
		height: 60,
		borderRadius: 50,
		padding: 1,
		flex: 1
	},
	button: {
		flex: 1,
		borderRadius: 50,
		backgroundColor: '#000',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	extendedButtonWrapper: {
		borderWidth: 0,
		borderRadius: 0,
		width: '100%',
		flex: 0,
		padding: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	extendedButton: {
		borderRadius: 0,
		width: '100%',
		height: '100%'
	}
})

export default AddButton