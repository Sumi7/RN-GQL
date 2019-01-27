import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native';

import { MonoText } from '../components/common/StyledText';
import Signup from '../components/Auth/signup'
import Login from '../components/Auth/login'
import GoogleAuth from '../components/Auth/googleAuth'

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { login: true, signupEmail: '' };
  }

  switchAuthScreen = (email) => {
    this.setState({login: false, signupEmail: email})
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="always" >
            <View style={styles.welcomeContainer}>
              <Image
                source={require('../assets/icons/logo-144.png')}
                style={styles.welcomeImage}
              />
            </View >
            <View style={styles.authWrapper}>
              { this.state.login ? <Login switchToSignup={this.switchAuthScreen}/> : <Signup defaultEmail={this.state.signupEmail} /> }
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
              <View style={{width: '10%', height: 1, backgroundColor: '#A8A6A6'}}></View>
              <Text style={{ fontSize: 15, color: '#A8A6A6', marginHorizontal: 7 }}>OR</Text>
              <View style={{ width: '10%', height: 1, backgroundColor: '#A8A6A6' }}></View>
            </View>
            <GoogleAuth login={this.state.login} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14151B',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 60,
    flex: 1,
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  welcomeImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
  },
  authWrapper: {
    marginBottom: 5
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default AuthScreen