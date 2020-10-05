/**
 * Component where all the decks are displayed.
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions, NavigationActions } from "react-navigation";

import AppHeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";
import DeckListContainer from "../components/DeckListContainer";
import { retrieveAllDecks } from "../utilities/DataStore";

const MainScreen = (props) => {

 
  const [decks, setDecks] = useState();
  const [filteredDecks, setFilteredDecks] = useState(decks);

  const filterHandler = (text) => {
    // we filter all decks based on what user typed in search category input
    // and save it in state
    setFilteredDecks((prevState) => {
      // it is a good practice to not mutate the original state
      // however, filter returns a new array and therefore it does not  mutate the original array
      // we have in state
      const updatedDecks = decks.filter((deck) => {
        return deck.category
          .toLowerCase()
          // We check if there is a category that starts with the word user typed
          .startsWith(text.trim().toLowerCase());
      });
      return updatedDecks;
    });
  };

  useEffect(() => {
    console.log("MAIN SCREEN");
    retrieveAllDecks()
      .then((data) => {
        // retrieve data from local storage, stored as JSON, and we turn it into
        // valid JavaScript Data structure
        setDecks(JSON.parse(data) || []);
        setFilteredDecks(JSON.parse(data));
      })
      .catch((err) => console.log(err));
  }, []);

  const deckViewHandler = (index) => {
    // when we navigate away we reset the stack
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "ClickedDeckView",
          params: { deckId: index },
        }),
      ],
    });
    props.navigation.dispatch(resetAction);
  };

  // component used to display a single deck
  const Item = ({ title, cardsNumber, index, category }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={
        () => deckViewHandler(index)
      }
    >
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.titleDeck}>{title}</Text>
          <Text style={styles.categoryStyle}> category: {category}</Text>
        </View>
        <View style={styles.noCardsStyle}>
          <Text style={styles.categoryStyle}> {cardsNumber} </Text>
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color="#513C2C"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  // we pass renderDeck to FlatList component to display an individual deck component
  const renderDeck = ({ item, index, category }) => (
    <Item
      index={index}
      key={index}
      cardsNumber={item.cards.length}
      category={item.category}
      title={item.title}
    />
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by category"
        onChangeText={filterHandler}
      />
      <DeckListContainer>
        {/* acts like a "map" function from JavaScript and it iterates through
        an array of elements and creates a component based on each element */}
        <FlatList
          data={filteredDecks}
          renderItem={renderDeck}
          keyExtractor={(item, index) => index.toString()}
        />
      </DeckListContainer>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons
          name="add-box"
          size={80}
          color={Colors.addButton}
          onPress={() => {
            props.navigation.navigate("AddDeckScreen");
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

// Header of component
MainScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;
  console.log(navigation.getParam());
  
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.headerColor : "",
    },
    drawerLockMode: 'locked-closed',
    headerTitle: " All Decks",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="editDeck"
          iconName="live-help"
          onPress={() => {
            navigation.navigate('Instructions');
          }}
        />
      </HeaderButtons>
    ),

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          size={35}
          color={Colors.itemDeckColor}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.backgroundColor,
  },
  item: {
    flex: 1,
    backgroundColor: Colors.itemDeckColor,
    borderRadius: 13,
    shadowColor: "#000",
    shadowOpacity: 1.34,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 20,
    elevation: 9,
    margin: "3%",
    padding: 14,
    marginBottom: "2%",
    paddingEnd: 50,
  },
  titleDeck: {
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 4,
    fontSize: 22,
    fontWeight: "bold",
  },
  categoryStyle: {
    fontSize: 16,
    //textAlign: "center",
  },
  noCardsStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    //backgroundColor: Colors.itemDeckColor,
    borderBottomWidth: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",


  },
  searchBar: {
    borderBottomWidth: 1,
    backgroundColor: Colors.textContainer,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
});

export default MainScreen;
