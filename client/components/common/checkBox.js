import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const CustomCheckBox = ({ data:{value, completed, index}, onSubTaskChange }) => {
	const [taskName, onSubTaskNamechange] = useState(value)
	const [isCompleted, onCompleted] = useState(completed)
	const [isBlurred, onBlur] = useState(false)

	const handleCheckBox = (completed) => {
		onCompleted(completed);
		onBlur(true);
		console.log('changing', { index, value, completed })
		onSubTaskChange({ index, value, completed })
	}

	const handleInput = (value) => {
		onBlur(true);
		onSubTaskChange({ index, value, completed: isCompleted})
	}
	
	return (
		<View style={styles.wrapper}>
			<TouchableHighlight style={styles.checkbox} onPress={() => handleCheckBox(!isCompleted)}>
				<View>
					{ isCompleted && <MaterialCommunityIcons name='check' size={18} color='#fff'/> }					
				</View>
			</TouchableHighlight>
			<TextInput 
				placeholder='Type here'
				autoCorrect={true}
				autoFocus={false}
				clearButtonMode='always'
				onChangeText={value => onSubTaskNamechange(value) }
				value={taskName}
				onBlur={handleInput}
				underlineColorAndroid='transparent'
				onSubmitEditing={handleInput}
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
		width: 25,
		height: 25,
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
		height: 30,
	},
})

export default CustomCheckBox