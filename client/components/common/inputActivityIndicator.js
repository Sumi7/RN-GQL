import React from 'react'
import { ActivityIndicator, View, Image, TouchableHighlight } from 'react-native'

const InputActivityIndicator = ({ loading, next, style, handler }) => {
	if (loading) {
		return (
			<View style={{ ...style }}>
				<ActivityIndicator size="small" color="#fff" />
			</View>
		)
	} else if (next) {
		return (
			<TouchableHighlight style={{ ...style }} onPress={handler}>
				<Image source={require('../../assets/icons/icons8-right-24.png')} />
			</TouchableHighlight>
		)
	}
}

export default InputActivityIndicator