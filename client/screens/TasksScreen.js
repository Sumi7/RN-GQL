import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withApollo } from 'react-apollo'

import { defaultStyle } from './defaultStyle'
import AddButton from '../components/Tasks/components/AddButton'
import TasksContainer from '../components/Tasks/components/DisplayTasks'

class TodosScreen extends Component {
  constructor() {
    super()
    this.state = {
      showCard: false,
      task: {
        id: '',
        taskName: '',
        subTasks: []
      }
    }
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Tasks'),
      headerLeft: navigation.getParam('HeaderLeft', null),
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: navigation.getParam('HeaderTintColor', defaultStyle.HeaderTintColor)
    };
  };

  addSubtask = () => {
    const defaultSubTaskValues = {
      index: this.state.task.subTasks.length,
      value: '',
      completed: false
    }

    this.setState(prevState => (
      { task: {...prevState.task, subTasks: [...prevState.task.subTasks, defaultSubTaskValues]} }
    ))
  }

  onSubTaskChange = (updatedStData) => {
    this.setState( prevState => (
      {
        task: {
          ...prevState.task,
          subTasks: prevState.task.subTasks.map(st => {
            if (st.index === updatedStData.index) {
              return updatedStData
            }
            return st
          }),
        }
      }
    ))
  }

  onPressHandler = (flag, Title='Add task') => {
    if(flag) {
      this.props.navigation.setParams({ 
        Title : Title ,
        HeaderLeft: (
          <TouchableHighlight style={styles.closeButton} onPress={() => this.onPressHandler(false)} activeOpacity={10} underlayColor="#00D8B6" >
            <MaterialCommunityIcons name="close" size={18} color="#000" />
          </TouchableHighlight>
        )
      })
    } else {
      this.props.navigation.setParams({ 
        HeaderLeft: null,
        Title: 'Tasks'
      })
    }
    this.setState({ showCard: flag })
  }

  updateTaskHandler = (task) => {
    this.setState({task: task})
    this.onPressHandler(true, 'Update task')
  }

  handleTaskName = (taskName) => {
    this.setState( prevState => ({ task: {...prevState.task, taskName} }) )
  }

  render() {
    return (
      <View style={{ ...styles.container, ...this.state.showCard ? { backgroundColor: '#000' } : {} }}>
        {!this.state.showCard && <TasksContainer updateTask={this.updateTaskHandler}/>}
        <View style={{ ...styles.fixedButton, ...this.state.showCard ? styles.showCard : {} }}>
          <AddButton 
            onPressHandler={this.onPressHandler} 
            extendButton={this.state.showCard} 
            task={this.state.task} 
            handleTaskName={this.handleTaskName}
            addSubtask={this.addSubtask}
            onSubTaskChange={this.onSubTaskChange}
          />
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

export default withApollo(TodosScreen)