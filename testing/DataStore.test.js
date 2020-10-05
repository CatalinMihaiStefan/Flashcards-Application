/**
 * This testing component is for testing AsyncStorage functions.
 */

import AsyncStorage from "@react-native-community/async-storage";

import {
  retrieveAllDecks,
  handlerDecksStorage,
  clearAllDecks,
} from "../utilities/DataStore";

// Clearing the data from storage .
beforeEach(async () => {
  await AsyncStorage.clear();
});

// testing for retrieving decks method.
describe("retrieveAllDecks", () => {
  test("if no results exist at key, return null", async () => {
    const APP_STORE_KEY = "decks";
    const result = await retrieveAllDecks(APP_STORE_KEY);
    expect(result).toEqual(null);
  });

  test("returns the added deck", async () => {
    const APP_STORE_KEY = "decks";
    await AsyncStorage.setItem(APP_STORE_KEY, JSON.stringify({ deck: 1 }));
    const result = await retrieveAllDecks(APP_STORE_KEY);
    expect(result).toEqual(JSON.stringify({ deck: 1 }));
  });
});

// testing for adding decks method.
describe("handlerDecksStorage", () => {
  test("if no deck exists, add deck", async () => {
    const APP_STORE_KEY = "decks";
    await handlerDecksStorage({ deck: 1 });

    const result = await retrieveAllDecks(APP_STORE_KEY);
    expect(result).toEqual(JSON.stringify({ deck: 1 }));
  });
});

//testing for clearing all data method.
describe("clearAllDecks", () => {
  test("clears all data such as added decks", async () => {
    const APP_STORE_KEY = "decks";
    await handlerDecksStorage({ deck: 1 });

    const firstResult = await retrieveAllDecks(APP_STORE_KEY);
    expect(firstResult).toEqual(JSON.stringify({ deck: 1 }));

    const secondResult = await clearAllDecks();
    expect(secondResult).toEqual(undefined);
  });
});
