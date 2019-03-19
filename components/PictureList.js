import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { fetchData } from "../utils/api";
import { connect } from "react-redux";

class PictureList extends React.Component {
  render() {
    if (!this.props.pictures === undefined) {
      console.log("Props Not Yet:", this.props.pictures);
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    if (this.props.pictures.length === 0) {
      return (
        <View>
          <Text>No pictures</Text>
        </View>
      );
    }
    console.log("Props is avilable:", this.props.pictures);
    return (
      <View style={styles.container}>
        {this.props.pictures.map(pic => (
          <View key={pic.id}>
            <Text>Id: {pic.id}</Text>
            <Text>Longitude: {pic.coords.longitude}</Text>
            <Text>Latitude: {pic.coords.latitude}</Text>
            <Image
              source={{ uri: pic.photo.uri, isStatic: true }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        ))}
      </View>
    );
  }
}
function mapStateToProps(pictures) {
  return {
    pictures
  };
}
export default connect(mapStateToProps)(PictureList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
