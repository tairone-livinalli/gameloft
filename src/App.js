import React from 'react';
import { SafeAreaView, StatusBar, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Routes from './routes';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const App = () => (
  <NavigationContainer>
    <SafeAreaView style={{ backgroundColor: Colors.black, flex: 1 }}>
      <StatusBar barStyle={'light-content'} />
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </SafeAreaView>
  </NavigationContainer>
);

export default App;
