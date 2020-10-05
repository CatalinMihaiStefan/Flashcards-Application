/**
 * Component for adding a deck screen.
 * 
 * version  1.0
 * author: Catalin Stefan
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
} from "react-native"

import { handlerDecksStorage, retrieveAllDecks } from "../utilities/DataStore";
import { StackActions, NavigationActions } from "react-navigation";
import { HeaderButtons, Item } from "react-navigation-header-buttons";


import AppHeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";

const AddDeckScreen = (props) => {

  // retrieve all decks from storage in order to append a new one and save it later
  const [fetchedDecks, setFetchedDecks] = useState();

  // initial empty deck, used for creating a new deck out of it
  // when typing in input
  const [enteredDeck, setEnteredDeck] = useState({
    title: "",
    category: "",
    cards: [],
  });

  // state for card term, entered via input
  const [enteredCardTerm, setEnteredDCardTerm] = useState("");

  // state for card definition entered in input
  const [enteredCardDef, setEnteredDCardDef] = useState("");

  // state for category, entered via input
  const [enteredCategory, setEnteredDCategory] = useState("");

  // helper state for validation, we check if the input is empty, but in order to avoid
  // having an error right in the beginning, we give user a chance of typing something before we decide if the input is
  //valid or not
  const [touched, setIsTouched] = useState(false);

  // helper state used for displaying an error when an input is not valid
  const [hasError, setHasError] = useState(true);
  // console.log(enteredDeck);

  useEffect(() => {
    console.log("[ADD DECK]");

    retrieveAllDecks()
      .then((data) => {
        let parsedData = JSON.parse(data);
        if (parsedData === null) {
          parsedData = [];
        }
        //  console.log(parsedData);
        // set the initial state with the retrieved decks
        setFetchedDecks(parsedData);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => console.log("ADD DECK UNMOUNTED");
    // });
    // return  focused;
  }, []);

  const deckInputHandler = (inputText) => {
    /**
     * update title
     * we create a copy of the current deck
     * never manipulate the original deck object in order to properly update the state
     */
    const updatedObject = {
      // we "spread" the current properties of this deck
      // then we override the title with the value from input
      ...enteredDeck,
      title: inputText,
    };
    /**
     * we know at this point that the input was touched and we can 
     * show an error if the input is not valid
     */
    setIsTouched(true);
    /**
     * title input is mandatory so we trim the white space and check whether it has a minimum value
     * and we display an error message
     */
    setHasError(inputText.trim() === '' || inputText.trim().length <= 3);
    /**
     * update deck in state
     */
    setEnteredDeck(updatedObject);
  };

  const inputTermHandler = (inputText) => {
    /**
     * we update the state for term
     */
    setEnteredDCardTerm(inputText);
  };
  const inputDefHandler = (inputText) => {
    /**
     * we update the state for definition
     */
    setEnteredDCardDef(inputText);
  };
  const inputCategoryHandler = (inputText) => {
    /**
     * we update category state
     */
    setEnteredDCategory(inputText);
  };

  const addCardHandler = () => {
    /**
     * create a card from term and def stored in state
     */
    const card = { term: enteredCardTerm, definition: enteredCardDef };
    /**
     * create a copy of deck, we never mutate the orginal one
     */
    const copiedDeck = {
      ...enteredDeck,
      // category: enteredCategory,
      /**
       * create another copy of the cards array and append to the end the newly created card
       */
      cards: [...enteredDeck.cards, card],
    };
    // console.log(copiedDeck);
    /**
     * update the deck state with the newly card added
     */
    setEnteredDeck(copiedDeck);
    /**
     * reset term and definition inputs
     */
    setEnteredDCardTerm("");
    setEnteredDCardDef("");
  };

  const addDeckHandler = () => {
    /**
     * if the title is empty we return
     */
    if(enteredDeck.title.trim() === '') {
      setIsTouched(true);
      return;
    }

    /**
     * we create a new array of decks based on the old one
     * first we copy the old array of decks
     * and we append a new deck to the end
     */
    const copiedDeck = {...enteredDeck, category: enteredCategory}
    const updatedDecks = [...fetchedDecks, copiedDeck];
    // console.log(fetchedDecks, updatedDecks);
    /**
     * save the new list of decks in storage
     */
    handlerDecksStorage(updatedDecks);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "MainScreenDecks" })],
    });
    props.navigation.dispatch(resetAction);
  };

  return (

    <View style={styles.container}>

      <View
        style={{ ...styles.addDeckCategoryContainer, ...styles.shadowEffect }}
      >
        <View style={styles.deckCategoryInputContainer}>
          <Text>Enter Deck name:</Text>
          <TextInput
            contextMenuHidden={true}
            placeholder="Enter here"
            style={styles.inputDeckCategory}
            onChangeText={deckInputHandler}
            value={enteredDeck.title}
            />
        </View>
        {/* display the error message if the input was touched and it has error */}
            {touched && hasError && <Text>Please add a title with minimum 4 charcters.</Text>}
        <View style={styles.deckCategoryInputContainer}>
          <Text>Enter category: </Text>
          <TextInput
            contextMenuHidden={true}
            placeholder="Enter the category:(optional)"
            style={styles.inputDeckCategory}
            onChangeText={inputCategoryHandler}
            value={enteredCategory}
          />
        </View>
      </View>
      <View style={{ ...styles.addCardContainer, ...styles.shadowEffect }}>
        <View style={styles.defTermInput}>
          <Text>Term:</Text>
          <TextInput
            textAlignVertical="top"
            multiline={true}
            numberOfLines={4}
            placeholder="Enter here"
            style={styles.inputCard}
            onChangeText={inputTermHandler}
            value={enteredCardTerm}
          />
        </View>
        <View style={styles.defTermInput}>
          <Text>Definition:</Text>
          <TextInput
            textAlignVertical="top"
            multiline={true}
            numberOfLines={4}
            placeholder="Enter here"
            style={styles.inputCard}
            onChangeText={inputDefHandler}
            value={enteredCardDef}
          />
        </View>
        <View style={styles.addButtonsContainer}>
          <View style={styles.button}>
            <Button
              color={Colors.itemDeckColor}
              title="Add card"
              onPress={addCardHandler}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={Colors.itemDeckColor}
              title="Add deck"
              onPress={() => {
                addDeckHandler();
              }}
            />
          </View>
        </View>
      </View>
      {/* </View>
      </TouchableWithoutFeedback> */}
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};
AddDeckScreen.navigationOptions = navData => {
  return { 
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.headerColor : "",
    },
    headerTitle: "All Decks",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="editDeck"
          iconName='live-help'
          onPress={() => {
            navData.navigation.navigate('Instructions');
          }}
        />
      </HeaderButtons>
    ),
  
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="editDeck"
          iconName='keyboard-backspace'
          size={35}  
           color={Colors.itemDeckColor} 
           onPress={() => {
            navData.navigation.navigate("MainScreenDecks");
          }}
        />
      </HeaderButtons>
    ),
  };
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: "stretch",
    backgroundColor: Colors.backgroundColor,
    overflow: "visible",
    alignItems: "stretch",
    height: "100%",
  },

  addDeckCategoryContainer: {
    justifyContent: "space-between",
    flex:1.1,
    padding: 10,
    backgroundColor: Colors.backgroundColor,
    marginBottom: 10,
    paddingBottom: 15
  },

  addCardContainer: {
    flex: 4,
    padding: 10,
    backgroundColor: Colors.backgroundColor,
  },

  deckCategoryInputContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 0.6,
    margin: 4,
    minHeight:15
  },

  defTermInput: {
    height: "45%",
    minHeight: 90,
    
    overflow: "scroll",
  },

  addButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingBottom:3
  },

  inputDeckCategory: {
    borderColor: "grey",
    borderWidth: 1,
    width: "65%",
    minHeight: 25,
    marginStart: 5,
    backgroundColor: Colors.textContainer,
  },
  inputCard: {
    width: "96%",
    height: "78%",
    borderColor: "grey",
    borderWidth: 1,
    padding: 7,
    backgroundColor:'white',
    margin: 6,
  },

  button: {
    borderRadius: 18,
    // paddingBottom: 10,
    marginBottom: 10,
    margin: 10,
  },

  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 5,
  },
});

export default AddDeckScreen;
