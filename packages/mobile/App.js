import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/Login.js';
import Register from './src/screens/Register.js';
import ForgotPassword from './src/screens/ForgotPassword.js';
import Dashboard from './src/screens/Dashboard.js';
import Reminders from './src/screens/Reminders.js';
import Health from './src/screens/Health.js';
import EditHealth from './src/screens/EditHealth';
import School from './src/screens/School.js';
import Profile from './src/screens/Profile.js';
import {JWTProvider, JWTContext} from './src/contexts/JWTContext.js'
import { LoginContext } from './src/contexts/LoginContext.js'
import { Provider as PaperProvider} from 'react-native-paper';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Suppressing an unnecessary warning from datetimepicker
// Minor error in 3rd party dependency, does not affect functionality
LogBox.ignoreLogs(['Warning: Possible Unhandled Promise Rejection ']);

export default function App() {  
  const [loggedIn, toggleLoggedIn] = useState(true);
  const state = {loggedIn, toggleLoggedIn};

  // https://reactjs.org/docs/context.html
  return (
    <NavigationContainer>
    <PaperProvider>
    <JWTProvider>
    <LoginContext.Provider value={state}>
      {!loggedIn ?
      (<Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      </Stack.Navigator>) :
      (<Tab.Navigator initialRouteName="Dashboard">
        <Tab.Screen name="Dashboard" component={DashboardStackScreen}/>
        <Tab.Screen name="Reminders" component={Reminders}/>
        <Tab.Screen name="Health" component={HealthStackScreen}/>
        <Tab.Screen name="School" component={School}/>
        <Tab.Screen name="Profile" component={Profile}/>
      </Tab.Navigator>)}
    </LoginContext.Provider>
    </JWTProvider>
    </PaperProvider>
    </NavigationContainer>
  );
}
const HealthStack = createStackNavigator();
function HealthStackScreen () {
  return(
    <HealthStack.Navigator>
      <HealthStack.Screen name="Health Profile" component={Health} />
      <HealthStack.Screen name="Edit Health Profile" component={EditHealth} />
    </HealthStack.Navigator>
  );
}
const DashboardStack = createStackNavigator();
function DashboardStackScreen (){
  return(
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={Dashboard}/>
    </DashboardStack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
