import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';

const Root = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Root.Navigator >
        <Root.Screen name="Home" component={Home} options={{headerShown: false}} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
