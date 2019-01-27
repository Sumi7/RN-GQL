import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { red } from 'ansi-colors';

const Error = ({error, style}) => {
	// console.log("error.js ===>",error)
	const customErrorContainerStyle = style && style.errorContainerStyle ? style.errorContainerStyle : {} 
	const customErrorTextStyle = style && style.errorTextStyle ? style.errorTextStyle: {}
	const errorText = error ? error : 'error'
	return (
		<View style={{ ...styles.container, ...customErrorContainerStyle }}>
			<Text style={{ ...styles.error, ...customErrorTextStyle }}>{errorText}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4
	},
	error: {
		color: '#E90F09',
		fontSize: 12,
	}
})

export default Error