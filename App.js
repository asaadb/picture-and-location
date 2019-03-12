import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraComponent  from './components/Camera';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CameraComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
