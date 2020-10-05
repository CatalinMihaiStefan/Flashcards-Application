/**
 * Component for all the setting, such as clear all data .
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import React, { useState } from "react";
import {
  Alert,
  Switch,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/colors";
import { clearAllDecks } from "../utilities/DataStore";
import AppHeaderButton from "../components/HeaderButton";

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.container}>
      {/** clears all data from storage */}
      <TouchableOpacity>
        <Button
          color="red"
          // onPress={() => Alert.alert('Simple Button pressed'),}
          onPress={clearAllDecks}
          title="Clear Data"
        />
      </TouchableOpacity>
 
        <View style={styles.switchContainer}>
          <Text> Dark mode  </Text>
          <Switch
            trackColor={{ false: "#767457", true: "#8145ff" }}
            thumbColor={isEnabled ? "#88dd4b" : "#0h43f4"}
            ios_backgroundColor="#009e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text> Notifications  </Text>
          <Switch
            trackColor={{ false: "#567577", true: "#8000ff" }}
            thumbColor={isEnabled ? "#f29d4b" : "#f543f4"}
            ios_backgroundColor="#3e563e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
    </View>
  );
};

SettingsScreen.navigationOptions = (navData) => {
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.headerColor : "",
    },
    headerVisible: true,
    drawerLockMode: "locked-closed",
    headerTitle: "All Setting",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="editDeck"
          iconName="live-help"
          onPress={() => {
            navData.navigation.navigate("Instructions");
          }}
        />
      </HeaderButtons>
    ),

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="menu"
          iconName="menu"
          size={35}
          color={Colors.itemDeckColor}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  switchContainer:{
margin:5,
    flexDirection:"row"
  }
});

export default SettingsScreen;
