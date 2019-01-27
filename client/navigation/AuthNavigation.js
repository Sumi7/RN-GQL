import { createStackNavigator } from 'react-navigation';
import AuthScreen from '../screens/AuthScreen';

const AuthStack = createStackNavigator({
  Auth: AuthScreen,
  // Signup: SignupScreen
});

AuthStack.navigationOptions = {
  tabBarVisible: false
}

export default AuthStack