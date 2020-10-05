/**
 * Component for adding icons to the buttons in header .
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 


import Colors from '../constants/colors';

const AppHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
    //   IconComponent={Ionicons}
      iconSize={26}
      color={Platform.OS === 'android' ? 'white' : Colors.mainColor}
    />
  );
};

export default AppHeaderButton;