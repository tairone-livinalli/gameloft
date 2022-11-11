import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Film from '../pages/FilmPage';
import Character from '../pages/CharacterPage';

const Stack = createNativeStackNavigator();

const Routes = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000' },
      headerTitleStyle: { color: '#fff', fontSize: 20 },
    }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Home"
      component={Home}
    />
    <Stack.Screen
      name="Film"
      component={Film}
      options={({ route }) => ({ title: route.params.title })}
    />
    <Stack.Screen
      name="Character"
      component={Character}
      options={({ route }) => ({ title: route.params.name })}
    />
  </Stack.Navigator>
);

export default Routes;
