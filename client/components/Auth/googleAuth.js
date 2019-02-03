import React, { Fragment, useState } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withNavigation } from 'react-navigation'
import { ActivityIndicator, Text, TouchableOpacity, View, Image, StyleSheet, Alert } from 'react-native'
import {Google} from 'expo';

import onSuccess from './setTokenAndNavigate'
import Error from '../common/error.js'

const GOOGLE_AUTH = gql`
  mutation googleAuthMutation($name: String!, $email: String!, $googleId: String!) {
    googleAuth(name: $name, email: $email, googleId: $googleId) {
      token
	  user {
		  email
	  }
    }
  }
`

function GoogleAuth({ googleAuthMutation, navigation: { navigate }, login }) {
	const [loading, setLoadingIndicator] = useState(false)
	const [authError, setdisplayError] = useState(false)
	const googleAuth = async () => {
		try {
			authError && setdisplayError(false)
			loading && setLoadingIndicator(false)
			let result
			if (__DEV__) {
				console.log("dev")
				result = await Google.logInAsync({
					androidClientId: '',
					scopes: ['profile', 'email'],
				});
				console.log("result====>", result)
			} else {
				result = await Expo.Google.logInAsync({
					androidStandaloneAppClientId: "",
					scopes: ['profile', 'email'],
				});
				console.log("result====>", result)
			}
			if (result.type === 'success') {
				const { user: { email, name, id: googleId } } = result
				setLoadingIndicator(true)
				const data = await googleAuthMutation({
					variables: { name, email, googleId },
				})
				setLoadingIndicator(false)
				const { data: { googleAuth: { token } } } = data
				onSuccess(token, navigate)
				return result.accessToken;
			} else {
				setLoadingIndicator(false)
				// setdisplayError('oops! :(. Please try again')
				// setdisplayError('dev===>', ___DEV__, "result===>", result)
				Alert.alert(
					`Error ${__DEV__}`,
					`result===> ${result}`
				)
				console.log("error:- else")
				return { cancelled: true };
			}
		} catch (e) {
			setLoadingIndicator(false)
			console.log("error:-", e)
			// setdisplayError('dev===>', ___DEV__, "result===>", result)
			Alert.alert(
				`Error ${__DEV__}`,
				`result===> ${e}`
			)
			// setdisplayError('oops! :(. Please try again')
		}

	}

	return (
		<View style={styles.container} >
			<TouchableOpacity onPress={() => googleAuth()} style={styles.button}> 
				<Image
					style={styles.image}
					source={require('../../assets/icons/icons8-google-48.png')}
				/>
				<Text style={styles.text}>{`${login ? 'login' : 'signup'} with google`}</Text>
			</TouchableOpacity>
			{loading && <ActivityIndicator size="large" />}
			{authError && <Error error={authError} />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: 5,
	},
	button: {
		// flex: 1,
		backgroundColor: '#fff',
		paddingVertical: 5,
		paddingHorizontal: 8,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 10,
		padding: 7,
		borderWidth: 2,
		borderColor: '#ffffff',
	},
	image: {
		width: 25,
		height: 25,
		resizeMode: 'contain',
		marginRight: 7,
	},
	text: { 
		// borderWidth: 1,
		// borderColor: 'red',
		fontSize: 15,
		fontWeight: '500',
		color: '#14151B'
	}
})

export default graphql(GOOGLE_AUTH, {
	name: 'googleAuthMutation', // name of the injected prop: this.props.createPostMutation...
})(withNavigation(GoogleAuth))