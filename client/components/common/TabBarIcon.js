import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <MaterialCommunityIcons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -4 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}