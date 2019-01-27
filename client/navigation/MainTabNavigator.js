import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/common/TabBarIcon';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const TodosStack = createStackNavigator({
  Todos: TasksScreen,
});

TodosStack.navigationOptions = {
  tabBarLabel: 'Tasks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='clipboard-check-outline'
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='settings'
    />
  ),
};

export default createBottomTabNavigator(
  {
    TodosStack,
    SettingsStack,
  },
  {
    initialRouteName: 'TodosStack',
    tabBarOptions: {
      activeTintColor: '#00D8B6',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'black',
      },
    }
  },
  );
