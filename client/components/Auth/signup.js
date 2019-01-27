import React, { Fragment, useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withNavigation } from 'react-navigation'

import CustomInput from '../common/input'
import onSuccess from './setTokenAndNavigate'
import InputActivityIndicator from '../common/inputActivityIndicator'

const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`

function Signup({ navigation: { navigate }, defaultEmail}) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState(defaultEmail)
	const [password, setPassword] = useState('')
	const [visibleInput, setVisibleInput] = useState('name')
	const [appState, setAppState] = useState({ loading: false, error: false, errorMessage: '' })

	const validateEmail = () => {
		setAppState({ ...appState, loading: true })
		const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if(emailRegex.test(email)) {
			setAppState({ ...appState, loading: true, error: false })
			setVisibleInput("password")
		} else {
			setAppState({ loading: false, error: true, errorMessage: 'Not a valid email'})
		}
	}

	const onSignup = async (authMutation) => {
		try {
			await authMutation()
		} catch(e) {
			console.log(e)
			setAppState({error: true, errorMessage: 'e'})
		}
	}
	return (
		<Mutation
			mutation={SIGNUP_MUTATION}
			variables={{ name, email, password }}
			onCompleted={data => onSuccess(data.signup.token, navigate)}
		>
			{(authMutation, { loading, error }) => (
				<Fragment>
					{visibleInput === "name" && <CustomInput
						placeholder='Enter your full name'
						autoCorrect={false}
						onChangeText={(changedName) => setName(changedName)}
						value={name}
						autoFocus={true}
						name="name"
						onSubmitEditing={() => setVisibleInput("email")}
					/>}
					{visibleInput === "email" && <CustomInput
						placeholder='Enter your email'
						autoCorrect={false}
						onChangeText={(changedEmail) => setEmail(changedEmail)}
						value={email}
						autoFocus={true}
						onSubmitEditing={validateEmail}
						render={loading ? style => <InputActivityIndicator style={style} loading={loading} /> : null}
						error={appState.error && appState.errorMessage}
					/>}
					{visibleInput === "password" && <CustomInput
						placeholder='Set a password'
						autoCorrect={false}
						onChangeText={(changedPassword) => setPassword(changedPassword)}
						value={password}
						onSubmitEditing={() => onSignup(authMutation)}
						autoFocus={true}
						secureTextEntry={true}
						render={loading ? style => <InputActivityIndicator style={style} loading={loading} /> : null}
						error={error && error}
					/>}
				</Fragment>
			)}
		</Mutation>
	)
}

export default withNavigation(Signup)