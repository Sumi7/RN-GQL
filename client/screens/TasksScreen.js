import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyle from './defaultStyle'
import AddButton from '../components/Tasks'

export default class TodosScreen extends React.Component {  
  state = {
    showCard: false
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Tasks'),
      headerLeft: navigation.getParam('headerLeft', null),
      ...defaultStyle
    };
  };


  onPressHandler = (bool) => {
    if(bool) {
      this.props.navigation.setParams({ 
        title : 'Add task' ,
        headerLeft: (
          <TouchableHighlight style={styles.closeButton} onPress={() => this.onPressHandler(false)} activeOpacity={10} underlayColor="#00D8B6" >
            <MaterialCommunityIcons name="close" size={18} color="#000" />
          </TouchableHighlight>
        )
      })
    } else {
      this.props.navigation.setParams({ headerLeft: null })
    }
    this.setState({ showCard: bool })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ ...styles.fixedButton, ...this.state.showCard ? styles.showCard : {} }}>
          <AddButton onPressHandler={this.onPressHandler} extendButton={this.state.showCard} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
  },
  createTaskContainer: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    position: 'relative'
  },
  fixedButton: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    flex: 1,
  },
  showCard: {
    position: 'relative',
    bottom: 0,
    right: 0
  },
  closeButton: {
    marginLeft: 15,
    padding: 2,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  }
});
