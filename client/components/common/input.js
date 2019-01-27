import React, { Fragment } from 'react';
import {
	StyleSheet,
	TextInput,
	View
} from 'react-native';

import Error from '../common/error.js'

const CustomInput = (props) => {
	let {
		placeholder,
		autoCorrect = false,
		autoFocus = false,
		onChangeText,
		value,
		onSubmitEditing,
		editable = true,
		secureTextEntry = false,
		render,
		error = false,
		name,
		style,
		onBlur
	} = props

	if (error && typeof (error) === "boolean") {
		error = `Invalid ${name}`
	}
	
	return (
		<Fragment>
			<View style={styles.inputContainer}>
				<View style={{...styles.inputBorderedBox, paddingRight: render ? '10%': 0, borderColor: error ? '#E90F09' : '#fff'}}>
					<TextInput
						style = {{ ...styles.inputBox, ...style ? style : {} }}
						placeholder={placeholder}
						autoCorrect={autoCorrect}
						autoFocus={autoFocus}
						clearButtonMode='always'
						onChangeText={onChangeText}
						value={value}
						onSubmitEditing={onSubmitEditing}
						onBlur={onBlur}
						editable={editable}
						underlineColorAndroid='transparent'
						secureTextEntry={secureTextEntry}
						placeholderTextColor={error ? '#E90F09' : 'white'}
					/>
				</View>
				{render && render(styles.activityActions)}
			</View>
			{error && <View style={styles.errorContainer}>
				<Error error={error} />
			</View>}
		</Fragment>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 15,
		alignItems: 'center',
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%',
	},
	inputBorderedBox: {
		width: '90%',
		borderBottomWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputBox: {
		height: 45,
		fontSize: 16,
		borderWidth: 0,
		paddingVertical: 5,
		paddingHorizontal: 7,
		width: '100%',
		color: '#fff',
		overflow: 'hidden',
		fontFamily: 'NunitoSans'
	},
	activityActions: {
		position: 'absolute',
		right: '10%'
	},
	errorContainer: {
		marginTop: 5,
		alignItems: 'center',
		paddingLeft: '10%',
		flexDirection: 'row',
	}
})

export default CustomInput