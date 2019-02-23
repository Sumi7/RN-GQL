import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigation';

const CreateRootNavigator = ({initialRouteName}) => {
  return createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: MainTabNavigator
    },
    {
      initialRouteName
    }
  )
};
export default createAppContainer(CreateRootNavigator)