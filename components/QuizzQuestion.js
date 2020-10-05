/**
 * Component for building the quiz.
 * 
 * version  1.0
 * author: Catalin Stefan
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/colors";

const QuizzQuestion = (props) => {
  /**
   * helper state used to show definition conditionally
   */
  const [showDef, setShowDef] = useState(false);
  const {
    card,
    clickNextHandler,
    showModalHandler,
    correctHandler,
    incorrectHandler,
    isFinished,
    showButton,
    answered,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Term:</Text>
        <Text style={styles.itemDecription}>{card.term}</Text>
      </View>

      {showDef && (
        <View style={styles.item}>
          <Text>Definition:</Text>
          <Text style={styles.itemDecription}>{card.definition}</Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <View style={styles.answerButtonsContainer}>
          <TouchableHighlight onPress={incorrectHandler}>
            <MaterialIcons
              style={styles.button}
              name="cancel"
              size={75}
              color="#931F1D"
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={correctHandler}>
            <MaterialIcons
              style={styles.button}
              name="check-circle"
              size={75}
              color="#094D92"
            />
          </TouchableHighlight>
        </View>
        <Button
        color="#9ED0E6"
          style={styles.button}
          disabled={showDef}
          title={"Show answer"}
          onPress={() => {
            setShowDef(true);
          }}
        />
        <Button
          color="#434A42"

          style={styles.button}
          disabled={!answered}
          title={`${!isFinished ? "Next Card" : "Confirm"}`}
          onPress={clickNextHandler}
        />
        {showButton && (
          <Button
          color="#513C2C"

            style={styles.button}
            title={"Show Results"}
            onPress={showModalHandler}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    paddingBottom: 20,
  },
  item: {
    height: "25%",
    backgroundColor: Colors.backgroundColor,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 1.34,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 10,
    elevation: 9,
    margin: 10,
    padding: 10,
    marginRight: 20,
  },
  answerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonsContainer: {
    height: '34%',
    justifyContent: "space-between",
    padding: 5,
  },
  itemDecription: {
    borderColor: 'grey',
    borderWidth: 1,
    width: "95%",
    height: "75%",
    backgroundColor: Colors.textContainer,
    padding: 5,
  },
});

export default QuizzQuestion;
