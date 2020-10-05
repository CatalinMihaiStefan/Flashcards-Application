/**
 * Component for displaying decks in MainScreen.
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import React from "react";
import { StyleSheet, View } from "react-native";

const DeckListContainer = (props) => {
  return (
    <View style={styles.container}>
      {/**
       * display the children props
       */}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "1%",
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default DeckListContainer;
