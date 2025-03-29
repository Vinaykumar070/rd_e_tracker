import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Home from './Home';
import AddUser from './AddUser';
import CurrentMonthPaidList from './CurrentMonthPaidList';
import More from './More';

const Tab = createBottomTabNavigator();

/**
 * Function to return a tab icon from assets.
 */
const getTabIcon = icon => {
  return <Image source={icon} style={{width: 24, height: 24}} />;
};

/**
 * Bottom Navigation with Tabs
 */
const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => getTabIcon(require('../assets/home.png')),
        }}
      />
      <Tab.Screen
        name="AddUser"
        component={AddUser}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: () => getTabIcon(require('../assets/user.png')),
        }}
      />
      <Tab.Screen
        name="Paid List"
        component={CurrentMonthPaidList}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: () => getTabIcon(require('../assets/to-do-list.png')),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: () => getTabIcon(require('../assets/app.png')),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
