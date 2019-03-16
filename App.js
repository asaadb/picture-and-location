import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraComponent  from './components/Camera';
import PictureList from "./components/PictureList"
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
      <View style={styles.container}>

          <CameraComponent />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
