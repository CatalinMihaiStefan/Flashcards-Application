/**
 * the Main Component
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, Text, View, Button, useState } from "react-native";
import {enableScreens} from 'react-native-screens'


import AppNavigator from './navigation/AppNavigator';


enableScreens();

export default function App() {
  return (
      < AppNavigator />
  );
}

const styles = StyleSheet.create({

});
