import React, { Component } from 'react'
import { Modal, View, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withApollo } from 'react-apollo'

import { Mutations } from '../operations'
import CreateCard from './Create'

class AddButton extends Component {
	constructor(props) {
		super(props)
		this.state = {loading: false}
	}

	onAddButtonPress = async () => {
		const { task: {taskName, subTasks, id}, extendButton, client} =this.props
		if(extendButton) {
			this.setState({ loading: true })
			try {
				if(id) {
					await client.mutate({
						mutation: Mutations.UPDATE_TASK,
						variables: {
							id,
							taskName,
							subTasks
						}
					})
				} else {
					await client.mutate({
						mutation: Mutations.ADD_TASK,
						variables: {
							taskName,
							subTasks
						}
					})
				}
				this.setState({ loading: false })
			} catch(e) {
				this.setState({ loading: false })
				console.log(e)
			}
		}
		this.props.onPressHandler(!extendButton)
	}

	render() {
		const { task: { taskName, subTasks }, extendButton } = this.props
		return (
			<View style={{ ...styles.mainWrapper, ...!extendButton ? styles.wrapperNonExtended : {} }}>
				{
					extendButton && (
						<View style={{ ...styles.cardContent }}> 
							<CreateCard 
								taskName={taskName}
								setTaskName={ taskName => this.props.handleTaskName(taskName)}
								subTasks={subTasks}
								onSubTaskChange={this.props.onSubTaskChange}
								addSubtask={this.props.addSubtask}
							/>
						</View>
					)
				}
				<View style={{ ...styles.buttonWrapper, ...extendButton ? styles.extendedButtonWrapper : {} }}>
					<TouchableHighlight onPress={() => this.onAddButtonPress()} elevation={ extendButton ? 2 : 0 } style={{...styles.button, ...extendButton ? styles.extendedButton : {} }} activeOpacity={10} underlayColor="#00D8B6" >
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