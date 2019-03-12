import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
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
                <TouchableOpacity>
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
