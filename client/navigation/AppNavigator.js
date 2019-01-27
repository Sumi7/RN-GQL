import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigation';

export const createRootNavigator = (initialRouteName) => {
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