/**
 * Component for edting cards or decks in DeckView.
 * 
 * version  1.0
 * author: Catalin Stefan
 */

import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Button,
} from "react-native";

import Colors from "../constants/colors";

const EditDetailsContainer = (props) => {
  const {
    deck,
    saveDeck,
    input1,
    input2,
    showModal,
    setShowModal,
    index,
    isDeck,
  } = props;
  /**
   * initialize a deck state received via props
   * explan : ***** the initial state is set only when this component mounts in the parent component
   * afterthat this state it never initialize again whenever the parent component re-renders
   * only an unmount and mount again sets an initial state to this component
   * besides the method explained above the only other way to "reinitialize" the state is by modifying
   * the state again with "setState" function returned by UseState hook
   */
  const [editedDeck, setEditedDeck] = useState(deck);
  /**
   * helper state for showing conditionally a modal
   */
  const [modalVisible, setModalVisible] = useState(false);

  // const [editedDeckCat, setEditedDeckCat] = useState(deck);
  // const [modalVisible, setModalVisible] = useState(false);
  // console.log(editedDeck)
  // input handlers
  const inputTermHandler = (inputText) => {
    /**
     * we check if is not in "deck" mode which means updating the title and category for deck
     * it means that we update cards in this case
     */

    if (!isDeck) {
      setEditedDeck((prevState) => {
        /**
         * create a copy of the previous deck and make a copy of its cards
         */
        const updatedDeck = {
          ...prevState,
          cards: [...prevState.cards],
        };
        /**
         * make a copy of individual card for the given index
         */
        const editedCard = { ...prevState.cards[index] };
        /**
         * update the copied card
         */
        editedCard.term = inputText;
        /**
         * update the card for the given index of the current deck
         */
        updatedDeck.cards[index] = editedCard;
        return updatedDeck;
      });
    } else {
      /**
       * it means we are not updating cards, but title / category
       */
      setEditedDeck((prevState) => {
        /**
         * create a copy of the old deck
         * then update the title
         */
        const updatedDeck = {
          ...prevState,
          title: inputText,
        };
        return updatedDeck;
      });
    }
  };

  const inputDefHandler = (inputText) => {
    if (!isDeck) {
      setEditedDeck((prevState) => {
        const updatedDeck = {
          ...prevState,
          cards: [...prevState.cards],
        };
        const editedCard = { ...prevState.cards[index] };
        editedCard.definition = inputText;
        updatedDeck.cards[index] = editedCard;
        return updatedDeck;
      });
    } else {
      setEditedDeck((prevState) => {
        const updatedDeck = {
          ...prevState,
          category: inputText,
        };
        return updatedDeck;
      });
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal ? showModal : modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        // }}
      >
        <View style={{ ...styles.addCardContainer, ...styles.modalView }}>
            <View style={styles.defTermInput}>
              <Text>{input1}</Text>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                numberOfLines={4}
                placeholder="Enter here"
                style={styles.inputCard}
                onChangeText={inputTermHandler}
                value={
                  !isDeck ? editedDeck.cards[index].term : editedDeck.title
                }
              />
            </View>
            <View style={styles.defTermInput}>
              <Text>{input2}</Text>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                numberOfLines={4}
                placeholder="Enter here"
                style={styles.inputCard}
                onChangeText={inputDefHandler}
                value={
                  !isDeck
                    ? editedDeck.cards[index].definition
                    : editedDeck.category
                }
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyItems: "space-around" }}
            >
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  if (setShowModal) {
                    setShowModal(false);
                  } else {
                    setModalVisible(false);
                  }
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  saveDeck(editedDeck);
                  if (setShowModal) {
                    setShowModal(false);
                  } else {
                    setModalVisible(false);
                  }
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          {/* </View> */}
        </View>
      </Modal>

      {!isDeck && (
        <Button
          color={Colors.headerColor}
          styles={styles.button}
          title={"Edit card"}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
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
  addCardContainer: {
    //  flex: 6,
    padding: 10,
   // alignItems: "center",
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
  defTermInput: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 5,

    backgroundColor: Colors.textContainer,
    width: "90%",
    overflow: "scroll",
    borderWidth: 1,
    borderColor: "green",
    marginBottom: 6,
  },
});

export default EditDetailsContainer;
