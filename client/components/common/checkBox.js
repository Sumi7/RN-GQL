import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const CustomCheckBox = ({ data, data:{value, completed}, onSubTaskChange }) => {
	const [taskName, onSubTaskNamechange] = useState(value)
	const [isCompleted, onCompleted] = useState(completed)
	const [isBlurred, onBlur] = useState(false)

	const updateSubtask = () => {
		onBlur(true);
		onSubTaskChange({ ...data, value, completed})
	}
	
	return (
		<View style={styles.wrapper}>
			<TouchableHighlight style={styles.checkbox} onPress={() => { onCompleted(!isCompleted); return updateSubtask() }}>
				<View>
					{ isCompleted && <MaterialCommunityIcons name='check' size={16} color='#fff'/> }					
				</View>
			</TouchableHighlight>
			<TextInput 
				placeholder='Type here'
				autoCorrect={true}
				autoFocus={false}
				clearButtonMode='always'
				onChangeText={taskName => { onBlur(false); onSubTaskNamechange(taskName)} }
				value={taskName}
				onBlur={updateSubtask}
				underlineColorAndroid='transparent'
				onSubmitEditing={updateSubtask}
				placeholderTextColor='white'
				style={{ ...styles.labelInput, borderColor: isBlurred ? '#000' : '#fff' }}
			/>
		</View>
		
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		display: 'flex',
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginBottom: 2,
		width: '100%',
		alignItems: 'center'
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: '#fff',
		marginRight: 20,
		flex: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
	},
	labelInput: {
		flex: 1,
		color: '#fff',
		fontSize: 15,
		paddingHorizontal: 5,
		borderBottomWidth: 1,
		paddingHorizontal: 7,
		paddingBottom: 6,
		height: 20,
	},
})

export default CustomCheckBox