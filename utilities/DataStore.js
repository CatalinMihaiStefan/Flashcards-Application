/**
 * Component that contains the functions for saving data.
 * 
 * version  1.0
 * author: Catalin Stefan
 */
import AsyncStorage from '@react-native-community/async-storage';

const APP_STORE_KEY = "decks";

// adds a new item in storage. It can be used for 
// cards/decks
export const handlerDecksStorage = async (deck) => {
  try {
    await AsyncStorage.setItem(
      APP_STORE_KEY,
      JSON.stringify(deck)
    );
  } catch (err) {
    console.log(err);
  }
};


// Get all saved decks from storage(saved as an array of decks in this case)
export const retrieveAllDecks = async () => {
  try {
    return await AsyncStorage.getItem(APP_STORE_KEY);
  } catch (err) {
    console.log(err);
  }
};

// Deletes all keys from storage
export const clearAllDecks = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (err) {
    console.log(err);
  }
};

