/**
 * Component for taking a quiz on a screen.
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QuizzQuestion from "../components/QuizzQuestion";
import Colors from "../constants/colors";
/**
 * Screen component for Quizz where all cards from the selected Deck are added to a Quiz.
 *
 * @version 1.0
 * @author Catalin Stefan
 */
const QuizScreen = (props) => {
  /**
   * variable for storing the data of the deck that was in DeckViewScreen.
   * here is passed with help of navigation, trough props.
   */

  const initialDeck = props.navigation.getParam("deck");

  /**
   * state for establishing when the cards are finnished.
   */
  const [activeIndex, setActiveIndex] = useState(0);
  /**
   * state for storing the array of cards from deck retriever.
   */
  const [cards, setCards] = useState(initialDeck.cards);
  /**
   *state for saving all the corect answers.
   */
  const [totalCorrect, setTotalCorrect] = useState(0);
  /**
   *state for saving all the incorect answers.
   */
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  /**
   *state for correct answer for a single card.
   */
  const [correct, setCorrect] = useState(false);
  /**
   *state for incorrect answer for a single card.
   */
  const [incorrect, setIncorrect] = useState(false);
  /**
   * variable for checking if all cards in the quiz are finished.
   */
  const isFinished = activeIndex === cards.length - 1;
  /**
   *variable that represents the handler for the button next card
   */
  const [showModal, setShowModal] = useState(false);

  const PopUp = () => (
    <View style={styles.container}>
      <Modal animationType="fade" visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.backButton}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={45}
              color="black"
              onPress={() =>
                props.navigation.navigate({
                  routeName: "MainScreenDecks",
                })
              }
            />
          </View>
          <View style={styles.resultsContainer}>
            <Text style={styles.textFormat}>Total questions: {cards.length}</Text>
            <Text style={styles.textFormat}>Correct answers: {totalCorrect}</Text>
                        <Text style={styles.textFormat}>Percentages:</Text>
            <View style={styles.percentageContainer}>

            <Text style={styles.textFormat}>
              Incorrect:{" "}
              {100 - ((totalCorrect / cards.length) * 100).toFixed(2)}% {"  "}
            </Text>
            <Text style={styles.textFormat}>
              Correct:{" "}
              {((totalCorrect / cards.length) * 100).toFixed(2)}% {" "}
            </Text>
          </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  const clickNextHandler = () => {
    if (correct) {
      // we use ++prevState to get the updated value
      // which won't work using prevState++

      // here we use the function version of "setState" in order
      // to get the latest version of the state and update it correctly
      // it is the good way of updating the state especially when
      // the new value is based on the old one
      setTotalCorrect((prevState) => ++prevState);
      setCorrect(false);
    } else {
      setTotalIncorrect((prevState) => ++prevState);
      setIncorrect(false);
    }
    if (totalCorrect + totalIncorrect === cards.length) {
      setShowModal(true);
      return;
    }
    if (activeIndex === cards.length - 1) {
      // if we reached the maximum index of the cards
      // we do nothing
      return;
    }
    /**
     * increment active index to move on to the next question
     */
    setActiveIndex((prevState) => ++prevState);
  };

  const showModalHandler = () => {
    if (totalCorrect + totalIncorrect === cards.length) {
      setShowModal(true);
      return;
    }
  };

  const correctHandler = () => {
    // toggle correct and incorrect so we only have
    // correct or incorrect selected at a time and not both
    if ((!incorrect && !correct) || (incorrect && !correct)) {
      setCorrect(true);
      setIncorrect(false);
    }
  };
  const incorrectHandler = () => {
    /**
     * toggle correct and incorrect so we only have
     * correct or incorrect selected at a time and not both
     */
    if ((!incorrect && !correct) || (!incorrect && correct)) {
      setIncorrect(true);
      setCorrect(false);
    }
  };
  /**
   * Iterates through cards from deck received via props
   *  and creates a quizz component based on that
   */
  const questions = cards.map((card, i) => {
    return (
      <View>
        <QuizzQuestion
          key={i}
          correctHandler={correctHandler}
          incorrectHandler={incorrectHandler}
          clickNextHandler={clickNextHandler}
          showModalHandler={showModalHandler}
          answered={correct || incorrect}
          card={card}
          isFinished={isFinished}
          showButton={totalCorrect + totalIncorrect === cards.length}
        />
      </View>
    );
  });
  //
  return (
    <View style={styles.container}>
      {/**
       * displays one question at a time based on the active index
       */}
      {questions[activeIndex]}
      <PopUp />
    </View>
  );
};
/**
 *
 */

QuizScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.headerColor : "",
    },
    drawerLockMode: "locked-closed",
    headerTitle: " Quiz",
  };
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  modalContainer: {
    height: "100%",
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    // justifyContent: "space-around",
    //
  },
  backButton: {
    // justifyContent: "flex-start",
  },
  resultsContainer:{
    marginTop:40,
    alignItems: "center",

    //justifyContent: 'space-around'
  },
  textFormat:{
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
    fontSize: 18,
    fontWeight: "bold",
  },
  percentageContainer:{
    marginTop: 10,
     flexDirection: 'row',
justifyContent:'space-around'

  }

});
/**
 *
 */
export default QuizScreen;
