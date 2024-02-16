import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Screens/Sign/Welcome';
import Login from './Screens/Sign/Login';
import SignUp from './Screens/Sign/SignUp';
import Main from './Screens/Map/Main';
import MyPage from './Screens/My/MyPage'
import FishBowlHome from './Screens/FishBowl/FishBowlHome'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
       
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
        <Stack.Screen name="FishBowlHome" component={FishBowlHome} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}