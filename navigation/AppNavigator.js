/**
 * Component for navigations between screens.
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import "react-native-gesture-handler";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import DeckViewScreen from "../screens/DeckViewScreen";
import QuizScreen from "../screens/QuizScreen";
import InstructionsScreen from "../screens/InstructionsScreen";

import Colors from "../constants/colors";
import Constants from 'expo-constants'

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.headerColor : "",
      headerTitleAlign: "center",
      marginTop: Constants.statusBarHeight, 
    },
    // animationEnabled: true,
  },
};

const AppNavigator = createStackNavigator(
  {
    MainScreenDecks: MainScreen,
    AddDeckScreen: AddDeckScreen,
    ClickedDeckView: DeckViewScreen,
    Quizz: QuizScreen,
    Instructions: InstructionsScreen
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
    initialRouteName: "MainScreenDecks",
    drawerLockMode: 'locked-closed',
  }
);

const SettingNavigator = createStackNavigator(
  {
    AppSettings: SettingsScreen,
  },
);

const SideNavigator = createDrawerNavigator(
  {
    Home: AppNavigator,
    AppsSettings: SettingNavigator,
  },
  {
    drawerLockMode: 'locked-closed',
    unmountInactiveRoutes: true,
    drawerBackgroundColor: "#C9F2C7",
  }
);

export default createAppContainer(SideNavigator);

// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
// import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { createNativeStackNavigator } from "react-native-screens/native-stack";

// const DecksBottomNavigator = createMaterialBottomTabNavigator(
//   {
//     DecksScreen: {
//       screen: AppNavigator,
//       navigationOptions: {
//         tabBarLabel: "Home",
//         activeColor: "white",
//         //tabBarBadge:'   ',
//         tabBarColor: "white",
//         barStyle: { backgroundColor: "grey" },
//         tabBarIcon: ({ tintColor }) => (
//           <MaterialCommunityIcons name="home" color={tintColor} size={24} />
//         ),
//       },
//     },
//     AddDecksScreen: {
//       screen: AddDeckScreen,
//       navigationOptions: {
//         tabBarLabel: "Add Deck",
//         //tabBarBadge: '    ',
//         tabBarColor: "white",
//         activeColor: "white",
//         barStyle: { backgroundColor: "grey", fontSize: 25 },
//         tabBarIcon: ({ tintColor }) => (
//           <MaterialIcons
//             name="add-box"
//             color={tintColor}
//             size={24}
//             // onPress={() => {
//             //   navigation.dispatch(
//             //     NavigationActions.reset({
//             //       index: 0,
//             //       actions: [
//             //         NavigationActions.navigate({ routeName: "AddDecksScreen" }),
//             //       ],
//             //     })
//             //   );
//             // }}
//           />
//         ),
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: "grey",
//       shifting: true,
//     },
//   }
// );
// const Stack = createNativeStackNavigator();

// function AppNavigator() {
//   return (
//     <Stack.Navigator
//       initialRouteName="MainScreenDecks"
//       screenOptions={{ gestureEnabled: false }}
//     >
//       <Stack.Screen name="MainScreenDecks" component={MainScreen} />
//       <Stack.Screen name="AddDeckScreen" component={AddDeckScreen} />
//       <Stack.Screen name="AppSettings" component={SettingsScreen} />
//       <Stack.Screen name="ClickedDeckView" component={} />
//     </Stack.Navigator>
//   );
// }

// const Drawer = createDrawerNavigator();

// return (
//     <NavigationContainer >
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="All Decks" component={MainScreen} />
//         <Drawer.Screen name="Add Deck" component={AddDeckScreen} />
//         <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
// );
