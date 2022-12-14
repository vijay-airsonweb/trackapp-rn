/* eslint-disable prettier/prettier */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginView from '../container/Login/LoginView';
import ChatView from '../container/Chat/ChatView';

const Stack = createStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chat"
          component={ChatView}
          options={{
            headerShown: false,
          }}
           //options={{title: 'Login Page'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
