import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  View,
  StyleSheet
} from "react-native";

export default class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Button title="Logout" onPress={this._signOutAsync} />
        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
