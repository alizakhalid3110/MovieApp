import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./MovieApp/main";
import Movie from "./MovieApp/Screens/Movie";
import Person from "./MovieApp/Screens/personscreen";
import SearchScreen from "./MovieApp/Screens/SearchScreen";

const Stack = createNativeStackNavigator();

const App = ()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
       
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Movie" component={Movie}/>
           <Stack.Screen name="Person" component={Person}/>
            <Stack.Screen name="Search" component={SearchScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;