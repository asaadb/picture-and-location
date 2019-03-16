import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import uuid from "uuid";
import { addPicture } from "../actions";
import { connect } from "react-redux";

class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
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
        dispatch(addPicture({ id: uuid(), photo }));
      });
    }
  };
  render() {
    console.log("The props: ", this.props);
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
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
                  <MaterialCommunityIcons
                    name="flash"
                    size={26}
                    color="white"
                  />
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
}
function mapStateToProps(pictures) {
  return {
    pictures
  };
}
export default connect()(CameraComponent);
