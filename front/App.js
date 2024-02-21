import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Screens/Sign/Welcome';
import Login from './Screens/Sign/Login';
import SignUp from './Screens/Sign/SignUp';
import Main from './Screens/Map/Main';
import MyPage from './Screens/My/MyPage'
import FishBowlHome from './Screens/FishBowl/FishBowlHome'
import FishBowlRanking from './Screens/FishBowl/FishBowlRanking'
import FishBowlCommunity from './Screens/FishBowl/FishBowlCommunity'
import FishBowlStore from './Screens/FishBowl/FishBowlStore'
import TrashCertification from './Screens/Certification/TrashCertification'
import Success from './Screens/Certification/Success'
import Failure from './Screens/Certification/Failure'
import MyCloset from './Screens/FishBowl/MyCloset' 
import FishBowlOther from'./Screens/FishBowl/FishBowlOther'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
        <Stack.Screen name="FishBowlHome" component={FishBowlHome} options={{ headerShown: false }} />
        <Stack.Screen name="FishBowlRanking" component={FishBowlRanking} options={{ headerShown: false }} />
        <Stack.Screen name="FishBowlCommunity" component={FishBowlCommunity} options={{ headerShown: false }} />
        <Stack.Screen name="FishBowlStore" component={FishBowlStore} options={{ headerShown: false }} />
        <Stack.Screen name="TrashCertification" component={TrashCertification} options={{ headerShown: false }} />
        <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
        <Stack.Screen name="Failure" component={Failure} options={{ headerShown: false }} />
        <Stack.Screen name="MyCloset" component={MyCloset} options={{ headerShown: false }} />
        <Stack.Screen name="FishBowlOther" component={FishBowlOther} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
   </RecoilRoot>
  );
}