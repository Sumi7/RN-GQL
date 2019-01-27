import { AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'

const onSuccess = async (token, navigate) => {
	try {
		await AsyncStorage.setItem("authToken", token)
	} catch (error) {
		// Error saving data
		navigate('Settings');
		console.log("asyncstorage error", error)
	}
	navigate('Todos');
}
 
export default onSuccess