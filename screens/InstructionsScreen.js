/**
 * Component for showing the instructions on a screen.
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Colors from "../constants/colors";

const InstructionsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.textFormat}>
          {"\n"} Home screen {"\n"}
          When the app is opened, the primary view with all created decks is
          displayed. In the right corner of the header, there is a button for
          the instructions of the application. In the left corner a button for
          opening the drawer where Home button and Setting are found.
          {"\n"}
          Under the header, a search input is found for searching decks by
          category. At the bottom of the page, there is a button for adding a
          deck. For each deck details such as title, category, and the number of
          existing cards are presented.
          {"\n"}
          For each deck details such as title, category, and the number of
          existing cards are presented.
          {"\n"}
          {"\n"} Adding a deck {"\n"}
          Once the button for adding a deck is pressed, the user is sent to the
          screen for adding a new deck. Each input field has a description
          beside it, for aiding the user’s understanding. In the bottom part,
          two buttons are found: one for adding cards and one for adding the
          deck. Once the user presses the button for adding the deck, he is sent
          to the main screen, where all the decks are found, including the
          latest one added.
          {"\n"}
          {"\n"} Accesing a deck {"\n"}
          When you taps on a deck, a screen with the details of that deck is
          opened. In the header the following buttons are found: a button for
          navigating back to the main screen, a button that opens a pop-up for
          editing the title and the category. and a button for deleting the
          deck.
          {"\n"}Below the header a button for showing and hiding the cards is
          found. For each card, the term and definition are shown. Under the
          card two buttons are found: one for deleting the card and another one
          for editing the card.On the bottom of the screen, a button for adding
          extra cards is found. Another button is found here, with the purpose
          of navigating to the quiz screen, where the user can test his
          knowledge for this deck. In case the deck does not contain any cards,
          no quiz is available.
          {"\n"}
          {"\n"} Taking a quizz {"\n"}
          The term is shown with the possibility of seeing the definition for,
          by pressing the button "Show definition".Before moving to the next term one of the two options need to be selected :
          {"\n"} Correct
          {"\n"} Incorrect
          {"\n"}Once the quiz is finnished press the button "Show results" and statististics will apear with:
          {"\n"} The number of total answers.
          {"\n"} Number of correct answers.
          {"\n"} Percentage for correct and incorrect answers. 
          {"\n"}
          {"\n"}                    Good luck!!!
        </Text>
      </ScrollView>
    </View>
  );
};

InstructionsScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.headerColor : "",
    },
    headerVisible: true,
    drawerLockMode: "locked-closed",
    headerTitle: "Instructions",
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Colors.backgroundColor,
    padding: 15,
  },
  textFormat: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 21,
    fontWeight: "300",
  },
});

export default InstructionsScreen;
