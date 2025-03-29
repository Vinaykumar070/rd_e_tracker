import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Login';
import BottomNavigation from './src/BottomNavigation';
import More from './src/More';
import { AuthProvider, useAuth } from './src/AuthContext'; // Import AuthProvider and useAuth

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from Auth Context

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="HomeScreen"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="More" component={More} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
