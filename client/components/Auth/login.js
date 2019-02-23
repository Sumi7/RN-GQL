import React, { Fragment, useState, useEffect } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { withNavigation } from 'react-navigation'
import { BackHandler } from 'react-native'

import CustomInput from '../common/input'
import onSuccess from './setTokenAndNavigate'
import InputActivityIndicator from '../common/inputActivityIndicator'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const VALIDATE_EMAIL_QUERY = gql`
  query ValidateEmailQuery($filter: String!) {
    users(filter: $filter) {
      email
    }
  }
`

function Login({ navigation: { navigate }, switchToSignup }) {
	const [email, setEmail] = useState('')
	const [appState, setAppState] = useState({loading: false, error: false, errorMessage: ''})
	const [accountStatus, setUserAccountStatus] = useState({exists: false})
	const [passwordField, showPasswordField] = useState(false)
	const [password, setPassword] = useState('')


	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);
		return function cleanup() {
			BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
		}
	})

	const handleHardwareBackPress = () => {
		if (passwordField) {
			showPasswordField(false)
		}
	}

	async function validateUserInDB(client) {
		if(accountStatus.exists) {
			showPasswordField(true)
			return;
		}
		setAppState({ ...appState, loading: true, error: false})
		const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(emailRegex.test(email)) {
			try {
				await client.query({
					query: VALIDATE_EMAIL_QUERY,
					variables: { filter: String(email) }
				})				
				setUserAccountStatus({...accountStatus, exists: true})
				setAppState({ ...appState, loading: false, error: false })
			} catch(e) {				
				setAppState({ ...appState, loading: false })
				switchToSignup(email)
			}
		} else {			
			setAppState({ loading: false, error: true, errorMessage: 'Not a valid email' })
		}
	}

	const handleActivityPress = () => {
		showPasswordField(true)
	}

	const onEmailChange = email => { 
		if(accountStatus.exists) {
			setUserAccountStatus({ exists: false });
		}
		setEmail(email)
	}

	return (
		<Fragment>
			{
				!passwordField && <ApolloConsumer>
					{client => (
						<CustomInput
							placeholder='Enter your email'
							autoCorrect={false}
							onChangeText={changedEmail => onEmailChange(changedEmail)}
							value={email}
							autoFocus={true}
							onSubmitEditing={accountStatus.exists ? () => showPasswordField(true) : () => validateUserInDB(client)}
							render={ appState.loading || accountStatus.exists ? style => <InputActivityIndicator style={style} loading={appState.loading} next={accountStatus.exists} handler={handleActivityPress} /> : null }
							error={appState.error && appState.errorMessage}
							name="email"
						/>
					)}
				</ApolloConsumer>
			}
			{
				passwordField && <Mutation
					mutation={LOGIN_MUTATION}
					variables={{ email, password }}
					onCompleted={data => { onSuccess(data.login.token, navigate) }}
				>
					{(authMutation, {loading, error}) => (
						<CustomInput
							placeholder='Password please...'
							autoCorrect={false}
							onChangeText={(changedPassword) => setPassword(changedPassword)}
							value={password}
							onSubmitEditing={authMutation}
							// editable={email || name ? true : false}
							secureTextEntry={true}
							render={ loading ? style => <InputActivityIndicator style={style} loading={true} /> : null }
							error={error}
							name="password"
						/>
					)}
				</Mutation>
			}
		</Fragment>
	)
}

export default withNavigation(Login)