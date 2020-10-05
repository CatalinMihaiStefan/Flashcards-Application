/**
 * Component for adding an extra card in DeckView.
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
} from "react-native";

import Colors from "../constants/colors";

const AddExtraCard = (props) => {
  const { deck, saveDeck, input1, input2, showModal, setShowModal } = props;
  const [editedDeck] = useState(deck);
  /**
   * set initial state for term and definition
   */
  const [term, setTerm] = useState("");
  const [def, setDef] = useState("");

  // input handlers
  const inputTermHandler = (inputText) => {
    /**
     * update term state
     */
    setTerm(inputText);
  };

  const inputDefHandler = (inputText) => {
    /**
     * update definition state
     */
    setDef(inputText);
  };

  const saveDeckHandler = () => {
    /**
     * create a copy of the old deck
     */
    const updatedDeck = {
      ...editedDeck,
    };
    /**
     * create a card with the values stored in state
     */
    const card = {
      term: term,
      definition: def,
    };
    /**
     * push the new card in the array of cards
     */
    updatedDeck.cards.push(card);

    /**
     * save the updated deck on storage and hide the modal
     */
    saveDeck(updatedDeck);
    setShowModal(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        /**show/ hide the modal conditionally */
        visible={showModal}
      >
        <View style={{ ...styles.addCardContainer, ...styles.shadowEffect }}>
          <View style={styles.modalView}>
            <View style={styles.defTermInput}>
              <Text>{input1}</Text>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                numberOfLines={4}
                placeholder="Enter here"
                style={styles.inputCard}
                onChangeText={inputTermHandler}
                value={term}
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
                value={def}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyItems: "space-around" }}
            ></View>
            <View
              style={{ flexDirection: "row", justifyItems: "space-around" }}
            >
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={saveDeckHandler}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
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
  addCardContainer: {
    padding: 10,
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

export default AddExtraCard;
