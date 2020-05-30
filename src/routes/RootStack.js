import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import SerieScreen from '../screens/SerieScreen/SerieScreen';

const Root = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Root.Navigator >
        <Root.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Root.Screen name="MovieScreen" component={MovieScreen} options={{headerShown: false}} />
        <Root.Screen name="SerieScreen" component={SerieScreen} options={{headerShown: false}} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
