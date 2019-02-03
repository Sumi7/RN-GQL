import '@babel/polyfill'

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Calendar, Permissions } from 'expo';
import { createRootNavigator } from './navigation/AppNavigator';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link'
import { setContext } from 'apollo-link-context'
// import { WebSocketLink } from 'apollo-link-ws'
import { AsyncStorage } from 'react-native'

const AuthToken = async () => {
  let token;
  try {
    token = await AsyncStorage.getItem('authToken')
  } catch {
    token = ""
  }
  return token
}

const signOut = async () => {
  let token;
  try {
    token = await AsyncStorage.removeItem('authToken')
  } catch {
    token = ""
  }
  return token
}
// signOut()
// const getCalendar = (async () => {
//   await Permissions.askAsync(Permissions.CALENDAR)
//   const result = await Calendar.getCalendarsAsync()
//   console.log("calendar", result)
//   return result
// })()

const httpLink = createHttpLink({
  uri: 'http://localhost:3006'
})

// const authMiddleware = new ApolloLink((operation, forward) => {
//   const token = AuthToken()
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   })

//   return forward(operation)
// })

const authMiddleware = setContext(async (request, { headers }) => {
  const token = await AuthToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// const link = split(
//   // ({ query }) => {
//   //   const { kind, operation } = getMainDefinition(query)
//   //   return kind === 'OperationDefinition' && operation === 'subscription'
//   // },
//   authLink.concat(httpLink)
// )

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache()
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    }
    AuthToken().then(token => this.token = token)
  }

  async componentDidMount() {
    try {
      await fetch('http://localhost:3006/test')
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      const initialRouteName = this.token ? "App" : "Auth"
      const Navigator = createRootNavigator(initialRouteName)
      return (
        <ApolloProvider client={client}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <Navigator />
          </View>
        </ApolloProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icons/logo-144.png'),
        require('./assets/icons/icons8-google-48.png'),
        require('./assets/icons/icons8-right-24.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'NunitoSans': require('./assets/fonts/NunitoSans-Bold.ttf'),
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#615F5B',
    fontFamily: 'NunitoSans',
  },
});
