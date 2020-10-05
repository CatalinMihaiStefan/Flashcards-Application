
// testing component for main screen
import React from 'react';
import MainScreen from "../screens/MainScreen"
import DeckListContainer from "../components/DeckListContainer";


import renderer from 'react-test-renderer';


  
  it('renders correctly', () => {
    renderer.create(<MainScreen />)
  })

// test('renders correctly', () => {
//   const tree = renderer.create(<DeckListContainer />).toJSON();
//   expect(tree).toMatchSnapshot();
// });