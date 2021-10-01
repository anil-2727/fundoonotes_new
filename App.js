/**
 * FundooNotes for creating notes.
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import AppContainer from './src/navigtion/appContainer';

const App = () => {

  return (
    <SafeAreaView style= {{flex:1, backgroundColor: '#F5F6FA'}}>
      <AppContainer/>
    </SafeAreaView>
  )
};


export default App;
