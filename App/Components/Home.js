import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity,Button,ImageBackground } from "react-native";

export default class Home extends React.Component {
  static navigationOptions = {
    //To set the header image and title for the current Screen
    title: "Home",
    headerTintColor: "#606070",
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
     
      // <View style={styles.container}>
      //  <View>
  
      //     <Image
      //       source={require("../../assets/homebg.jpg")}
      //       style={styles.logo}
      //     />
      //   </View>

      //   <View>
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => navigate("AllJobs", { title: "Find Jobs" })}
      //     >
      //       <Text style={styles.buttonText}> Find Jobs</Text>
      //     </TouchableOpacity>

      //     <TouchableOpacity
      //       activeOpacity={0.2}
      //       chevron={{ color: "red" }}
      //       style={styles.button}
      //       onPress={() => navigate("ConsList", { id: "1" })}
      //     >
      //       <Text style={styles.buttonText}> Find Consultant</Text>
      //     </TouchableOpacity>
      //   </View> 
      //   <View style={{ alignItems: "flex-end" }}>
      //     <Text style={{ alignSelf: "center", color: "#ccc", marginTop: 50 }}>
      //       Powered by Procons Infotech
      //     </Text>
      //   </View>
      //   </View>

      <View style={ styles.container }>
      <ImageBackground source={require('../../assets/home2.png')} style={styles.backgroundImage}>
          <View style={ styles.loginForm }>
               <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('AllJobs', { title: "All Jobs" })}>
            <Text style={styles.buttonText}> Find Jobs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.2}
            chevron={{ color: "red" }}
            style={styles.button}
            onPress={() => navigate("AllConsultants", { id: "1" })}>
            <Text style={styles.buttonText}> Find Consultant</Text>
          </TouchableOpacity>


          <TouchableOpacity
            activeOpacity={0.2}
            chevron={{ color: "#eee" }}
            onPress={() => navigate("Login")}>
            <Text style={styles.regLogText}> Register / Login </Text>
          </TouchableOpacity>
          </View>
      </ImageBackground>
  </View>

    );
  }
}

const styles = StyleSheet.create({
  // container: {
  
  //   flex: 1,

  // },

  button: {
    backgroundColor: "#fff",
    paddingHorizontal:10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
  },
  buttonText: {
    color: "#f76f36",
    fontWeight: "800",
    fontSize: 18,
    margin: 20,
  },

    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    loginForm: {
        position: 'absolute',
        justifyContent:'center',
        top: 0,
        bottom: 0,
        left: 15,
        right: 15
    },
    regLogText:{
      backgroundColor:'#e4e4e4',
      padding:10,
      textAlign:'center',
      fontWeight:'600',
      color:'#5f5f5f'
    }

});
