import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Films from './Films';
import Favorites from './Favorites';
import { HomeIcon, HeartIcon } from '../icons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Films"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => <HomeIcon fill="#000" height={20} width={20} />,
        }}
        name="Films"
        component={Films}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <HeartIcon fill="#000" height={20} width={20} />,
        }}
        name="Favorites"
        component={Favorites}
      />
    </Tab.Navigator>
  );
};

export default Home;
