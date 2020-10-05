/**
 * Component for displaying a single deck on screen.
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
  Platform,
  FlatList,
} from "react-native";
import { retrieveAllDecks, handlerDecksStorage } from "../utilities/DataStore";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/colors";
import AppHeaderButton from "../components/HeaderButton";
import EditDetailsContainer from "../components/EditDetailsContainer";
import AddExtraCard from "../components/AddExtraCard";

const DeckViewScreen = (props) => {
  /**
   * retrieve the id passed via props
   */
  const deckIndex = props.navigation.getParam("deckId");
  /**
   * initialize decks
   */
  const [decks, setDecks] = useState();
  /**
   * initialize deck
   */
  const [deck, setDeck] = useState();
  /**
   * state used to disply cards conditionally
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * state used to display add extra card modal conditionally
   */
  const [addCardVisible, setAddCardVisible] = useState(false);

  /**
   * state used to display a modal conditionally
   */
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    /**
     * get all decks from storage
     */
    retrieveAllDecks()
      .then((data) => {
        /**
         * update decks and deck state with data
         */
        setDeck(JSON.parse(data)[deckIndex]);
        setDecks(JSON.parse(data));
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   * handler used to toggle cards we display
   */
  const toggleCardsVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const deleteCard = (index) => {
    /**
     * we use setDeck method passed by React useState hook to update the state
     */
    setDeck((prevState) => {
      /**
       * we update the card by creating a copy
       * we use function version of "setState" so that React guarantees that we get the latest state
       */
      const updatedCard = {
        ...prevState,
        /**
         * we exclude / filter the card with the given index in order to delete the card
         */
        cards: [...prevState.cards].filter((card, i) => i !== index),
      };
      return updatedCard;
    });

    setDecks((prevState) => {
      /**
       * update decks by creating a copy of the latest state
       */
      const updatedDecks = [...prevState];
      /**
       * make a copy of the deck object at a given index
       */
      const updatedDeck = { ...updatedDecks[deckIndex] };
      /**
       * we exclude a deck for the given index
       */
      updatedDeck.cards = [...updatedDeck.cards].filter(
        (card, i) => i !== index
      );
      /**
       * update the list of decks at the given index
       * with the updated deck
       */
      updatedDecks[deckIndex] = updatedDeck;
      handlerDecksStorage(updatedDecks);
      return updatedDecks;
    });
  };

  const deleteDeckHandler = () => {
    /**
     * create a copy of the old list of decks
     */
    const updatedDecks = [...decks];
    /**
     * remove a deck at a given index
     */
    updatedDecks.splice(deckIndex, 1);
    /**
     * update the list of decks
     */
    handlerDecksStorage(updatedDecks);
  };
  useEffect(() => {
    if (deck) {
      /**
       * if we have a deck
       * pass the title, deleteDeckHandler and setModal visible via params
       */
      props.navigation.setParams({
        deleteDeckHandler,
        deckTitle: deck.title,
        setModalVisible,
      });
    }
    /**
     * pass "dependencies" so that useEffect executes
     * whenever decks or deck change
     */
  }, [decks, deck]);

  const saveEditedDeck = (editedDeck) => {
    /**
     * make a copy of the list of decks
     */
    const updatedDecks = [...decks];
    /**
     * update the list of decks wit the received edited deck
     * then save it to local storage
     */
    updatedDecks[deckIndex] = editedDeck;
    handlerDecksStorage(updatedDecks);
    setDeck(editedDeck);
  };
  // console.log(deck)
  const Item = ({ term, definition, index }) => (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.cardContainer}>
          <Text>Term:</Text>
          <Text>{term}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text>Definition:</Text>
          <Text>{definition}</Text>
        </View>
      </View>
      <View>
        {/** pass the index to delete card handler to know which card we need to delete */}
        <View style={styles.buttonDeleteCard}>
          <Button
            color={Colors.itemDeckColor}
            title={"delete card"}
            onPress={() => deleteCard(index)}
          />
        </View>
        <EditDetailsContainer
          key={index}
          deck={deck}
          saveDeck={saveEditedDeck}
          input1="Term:"
          input2="Definition:"
          index={index}
        />
      </View>
    </View>
  );

  const renderCard = ({ item, index }) => (
    <Item
      index={index}
      key={index}
      definition={item.definition}
      term={item.term}
    />
  );

  let title = null;
  if (deck) {
    title = deck.title;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <Button
          styles={styles.button}
          title={"Show cards"}
          onPress={toggleCardsVisibility}
        />
        {isVisible && (
          <FlatList
            data={deck && deck.cards}
            renderItem={renderCard}
            keyExtractor={(card, index) => index.toString()}
          />
        )}
      </View>

      <View style={styles.quizz}>
        <Button
          styles={styles.button}
          color={Colors.itemDeckColor}
          title={"Add a new Card"}
          onPress={() => setAddCardVisible(true)}
        />
        <Button
          styles={styles.button}
          color={Colors.headerColor}
          disabled={deck && deck.cards.length === 0}
          title={"Start Quiz"}
          onPress={() => {
            props.navigation.navigate({
              routeName: "Quizz",
              params: { deck: deck },
            });
          }}
        />
      </View>
      {modalVisible && (
        <EditDetailsContainer
          deck={deck}
          saveDeck={saveEditedDeck}
          input1="Title:"
          input2="Category:"
          isDeck={true}
          showModal={modalVisible}
          setShowModal={setModalVisible}
        />
      )}
      {addCardVisible && (
        <AddExtraCard
          input1={"Term:"}
          input2={"Definition:"}
          deck={deck}
          saveDeck={saveEditedDeck}
          showModal={addCardVisible}
          setShowModal={setAddCardVisible}
        />
      )}
    </View>
  );
};

DeckViewScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state;
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.headerColor : "",
    },
    title: params.deckTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="editDeck"
          iconName="edit"
          onPress={() => {
            params.setModalVisible(true);
          }}
        />
        <Item
          title="deleteDeck"
          iconName="delete"
          onPress={() => {
            params.deleteDeckHandler();
            navigation.navigate("MainScreenDecks");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
        <Item
          title="editDeck"
          iconName="keyboard-backspace"
          size={35}
          color={Colors.itemDeckColor}
          onPress={() => {
            navigation.navigate("MainScreenDecks");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    // flex: 1,
    padding: 10,
    // alignItems: "stretch",
    backgroundColor: Colors.backgroundColor,
    overflow: "visible",
    height: "100%",
  },
  cardsContainer:{
    marginBottom: 10,
    flex:6,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    backgroundColor: Colors.textContainer,
    alignSelf: "stretch",
  },
  button: {
    alignItems: "center",
    fontSize: 22,
    textAlign: "center",
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  openButton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  defTermInput: {
    backgroundColor: Colors.textContainer,
    width: "90%",
    height: "30%",
    minHeight: 40,
    overflow: "scroll",
    borderWidth: 1,
    borderColor: "blue",
    marginBottom: 6,
  },
  quizz: {
    display: 'flex',
    justifyContent: 'space-around',

     flexDirection: "row",
     flex: 0.4,

  },
  buttonDeleteCard: {
    alignContent: "center",
    alignSelf: "center",
    width: 110,
  },
  cardContainer: {
    
    margin: 5,
    padding: 5,
    borderWidth: 1,
    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
  },
});

export default DeckViewScreen;
