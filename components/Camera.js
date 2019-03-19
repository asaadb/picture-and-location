import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, Permissions, Location } from "expo";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Foundation
} from "@expo/vector-icons";
import uuid from "uuid";
import { addPicture } from "../actions";
import { connect } from "react-redux";

class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    hasLocationPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const location = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({
      hasCameraPermission: camera.status,
      hasLocationPermission: location.status
    });
  }

  askPermission = () => {
    Permissions.askAsync(Permissions.CAMERA)
      .then(({ status }) => {
        this.setState(() => ({ hasCameraPermission: status }));
      })
      .catch(error => console.warn("error asking camera permission: ", error));
  };

  snapPhoto = async () => {
    console.log("Button Pressed");
    const { dispatch } = this.props;
    if (this.camera) {
      console.log("Taking photo");
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true
      };
      this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        Location.getCurrentPositionAsync({ enableHighAccuracy: false, maximumAge: 15000 })
          .then(({ coords }) => {
            dispatch(addPicture({ id: uuid(), photo, coords }));
          }
        )
        .catch(error => {
          console.log('Getting loacation error: ', error);
        });
      });
    }
  };

  render() {
    console.log("The props: ", this.props);
    const { hasCameraPermission, hasLocationPermission } = this.state;
    if (hasCameraPermission === "undetermined") {
      return (
        <View style={styles.center}>
          <Foundation name="alert" size={50} />
          <Text>You need to enable the camera for this app.</Text>
          <TouchableOpacity style={styles.button} onPress={this.askPermission}>
            <Text style={styles.buttonText}>Enable</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (hasCameraPermission === "denied") {
      return (
        <View style={styles.center}>
          <Foundation name="alert" size={50} />
          <Text>
            You denied your camera. You can fix this by visiting your settings
            and enabling camera for this app.
          </Text>
        </View>
      );
    }
    if (hasLocationPermission === "undetermined") {
      return (
        <View style={styles.center}>
          <Foundation name="alert" size={50} />
          <Text>You need to enable the location services for this app.</Text>
          <TouchableOpacity style={styles.button} onPress={this.askPermission}>
            <Text style={styles.buttonText}>Enable</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (hasLocationPermission === "denied") {
      return (
        <View style={styles.center}>
          <Foundation name="alert" size={50} />
          <Text>
            You denied your location. You can fix this by visiting your settings
            and enabling location services for this app.
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-start",
                  alignItems: "center",
                  margin: 20
                }}
              >
                <MaterialCommunityIcons name="flash" size={26} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-start",
                  alignItems: "center",
                  margin: 20
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <FontAwesome name="camera" size={26} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{ alignItems: "center", justifyContent: "flex-start" }}
            >
              <TouchableOpacity onPress={this.snapPhoto.bind(this)}>
                <MaterialCommunityIcons
                  name="circle-outline"
                  style={{ color: "white", fontSize: 100 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  marginRight: 10,
                  marginBottom: 10
                }}
              >
                <MaterialCommunityIcons
                  name="google-circles-communities"
                  style={{ color: "white", fontSize: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  button: {
    padding: 10,
    backgroundColor: "purple",
    alignSelf: "center",
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
});

function mapStateToProps(pictures) {
  return {
    pictures
  };
}
export default connect()(CameraComponent);
