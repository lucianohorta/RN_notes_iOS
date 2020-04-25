import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/NotepadContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import NoteForm from './src/components/NoteForm';
import Header from '../notesiphone/src/components/Header';
import { Ionicons } from '@expo/vector-icons';

import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';



const stacknavigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
    Note: NoteForm
  }, 
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

// export default createAppContainer(stacknavigator);
const App = createAppContainer(stacknavigator);

export default (props) => {
  let [fontsLoaded] = useFonts({
    // 'Inter-Black': 'https://rsms.me/inter/font-files/Inter-Black.otf?v=3.12',
    'SFLight': require('./assets/fonts/SFLight.ttf'),
    'SFPro': require('./assets/fonts/SFProDisplay.ttf'),
    'SFSemiBold': require('./assets/fonts/SFSemiBold.ttf'),
    'SFBold': require('./assets/fonts/SFBold.ttf'),
  });

  if (!fontsLoaded) {
      return <AppLoading />;
  } else {
      return (
          <Provider>
            <App />
          </Provider> 
      );
  }
};
