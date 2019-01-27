import React from 'react';
import { View } from 'react-native';
import defaultStyle from './defaultStyle'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
    ...defaultStyle
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View />;
  }
}