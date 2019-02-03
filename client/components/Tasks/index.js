import React, { Component } from 'react'
import { Modal, View, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import gql from 'graphql-tag'
// import { input } from 'graphql'
import { Mutation, Query, withApollo } from 'react-apollo'
import CreateCard from './create'

const ADD_TASKS = gql`
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

class AddButton extends Component {
	constructor() {
		super()

		this.state = {
			taskName: '',
			subTasks: [],
			loading: false
		}
	}

	addSubtask = () => {
		const defaultSubTaskValues = {
			index: this.state.subTasks.length,
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

	onAddButtonPress = async () => {
		const { taskName, subTasks } =this.state
		const { extendButton, client } = this.props
		if(extendButton) {
			this.setState({ loading: true })
			try {
				await client.mutate({
					mutation: ADD_TASKS,
					variables: {
						taskName,
						subTasks
					}
				})
				this.setState({ loading: false })
			} catch(e) {
				console.log(e)
			}
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
					<TouchableHighlight onPress={() => this.onAddButtonPress()} style={{...styles.button, ...extendButton ? styles.extendedButton : {} }} activeOpacity={10} underlayColor="#00D8B6" >
						<MaterialCommunityIcons name="plus" size={30} color="#fff" />
					</TouchableHighlight>
				</View>
				{
					extendButton && (
						<Modal
							animationType="none"
							visible={this.state.loading}
							transparent={true}
							onRequestClose={() => !extendButton && this.setState({loader: false})}
						>
							<View style={styles.loader}>
								<ActivityIndicator color='#fff' size='large' />
							</View>
						</Modal>
					)
				}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		width: '100%',
		backgroundColor: '#000',
		position: 'relative'
	},
	wrapperNonExtended: {
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 50,
		overflow: 'hidden',
	},
	cardContent: {
		flex: 1,
		borderWidth: 2,
		borderColor: 'red',
		backgroundColor: '#000'
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
	},
	loader: {
		...StyleSheet.absoluteFill,
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default withApollo(AddButton)