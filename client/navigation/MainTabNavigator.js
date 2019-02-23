import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/common/TabBarIcon';
import TasksScreen from '../screens/TasksScreen';
import Calendar from '../screens/calendar';

const defaulNavOptions = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  }
}

const TasksStack = createStackNavigator({
  Todos: {
    screen: TasksScreen,
    navigationOptions: () => ({
      ...defaulNavOptions,
    }),
  }
});

TasksStack.navigationOptions = {
  tabBarLabel: 'Tasks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    focused={focused}
    name='clipboard-check-outline'
    />
  ),
};

const Calendarstack = createStackNavigator({
  Settings: Calendar,
});

Calendarstack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='calendar-check'
    />
  ),
  ...defaulNavOptions
};

const bottomTabNavigator = createBottomTabNavigator(
  {
    TasksStack,
    Calendarstack,
  },
  {
    initialRouteName: 'TasksStack',
    tabBarOptions: {
      activeTintColor: '#000',
      labelStyle: {
        fontSize: 12,
        fontWeight: '500'
      },
      style: {
        backgroundColor: 'white',
      },
    }
  },
);

export default createAppContainer(bottomTabNavigator)