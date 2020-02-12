import React, { Component } from "react";
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Alert,ScrollView,Image,TouchableHighlight,Button,KeyboardAvoidingView} from "react-native";
import { signup, base_url } from "../../Components/Service/ApiConfig";

var STORAGE_KEY = "id_token";
const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Register',
    headerTransparent: false
  };
  state = {
    isFocused: false,
    firstName: "",
    lastName: "",
    email: "",
    yourPhone:"",
    username: "",
    password: "",
    confirmPassword:""
  };

  static navigationOptions = {
    title: 'Sign up',
  };

  //textInput Values set to states
  handleFirstName = text => {
    this.setState({ firstName: text });
  };
  handleLastName = text => {
    this.setState({ lastName: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handleYourPhone = text => {
    this.setState({ yourPhone: text });
  };
  handleUsername = text => {
    this.setState({ username: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };
  signup = (name, job) => {
    alert("name: " + name + " job: " + job);
  };

  //signup Action
  _userSignup(firstName,lastName,email,yourPhone,username,password,confirmPassword) {


    fetch((base_url+signup), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
        body: JSON.stringify({
          // name: name,
          // job: job
          fname: firstName,
          lname: lastName,
          email: email,
          phone:yourPhone,
          username: username,
          password: password,
          //confirmPassword:confirmPassword,
          cat_id :"1",
          group_id:"2"
      })
    })
      .then(response => response.json())
      .then(responseData => {
       () => navigate("Login");
      }).catch(error => {
        console.error(
          Alert.alert("Sorry this option is currently unavailable"),
        );
      });
     
  }
  render() {
    const {navigate} = this.props.navigation;
    const { isFocused } = this.state;
    const { onFocus, onBlur, ...otherProps } = this.props;
    return (
  <KeyboardAvoidingView  behavior="position" enabled>
   <ScrollView> 
   <Image
          style={styles.image}
          source={require('../../../assets/logo.png')}
        />
        {/* First name */}
        <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY }
        placeholder="First Name"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        style={styles.textInput}
        autoCapitalize="words"
      />
       {/* Last Name */}
        <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY }
        placeholder="Last Name "
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        style={styles.textInput}
        autoCapitalize="words"
      />
        {/* Email */}
        <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY }
        placeholder="Email"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        style={styles.textInput}
        autoCapitalize="sentences"
      />  
        {/* Password */}
        <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY }
        secureTextEntry
        placeholder="Create a password"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={this.handlePassword}
      />
        {/*Register Button */}
        <TouchableOpacity
          style={styles.submitButton}
            onPress={(() => this._userSignup(
            this.state.firstName, 
            this.state.lastName, 
            this.state.email, 
            this.state.yourPhone,
            this.state.username,
            this.state.password,
            this.state.confirmPassword,))}>
          <Text style={styles.submitButtonText}> Register </Text>
        </TouchableOpacity>
        <View style={styles.footer}>
      <View style={{alignItems: 'center',flexDirection:'row',alignSelf:'center',}}>
        <Text style={{ fontSize: 16,fontWeight:'600',color:'#c1c1c1'}}> Already Have an Account? </Text>
        <TouchableOpacity
        onPress={() =>navigate('Login', {name: 'namef'})}>
        <Text style={{color:'#0a78b2',fontSize:16,fontWeight:'600',margin:7}}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );  
  }
}
export default SignUp;

const styles = StyleSheet.create({
  container: {
    marginTop:20
  },
  image:{
    width: 150,
    height: 18, 
    alignSelf: 'center',
    marginBottom:35,
    marginTop:20  
},
  textInput: {
    height: 50,
    marginHorizontal:10,
    paddingHorizontal:18,
    borderColor:'#e0e0e0',
    borderWidth:2,
    borderRadius:8,
    marginVertical:5 
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: "#f76f36",
    padding: 10,
    margin:5,
    marginBottom:20,
    height: 45,
    alignSelf: 'stretch',
    borderRadius:5
  },
  submitButtonText: {
    color: "white",
    fontSize:16,
    textAlign:'center'
  },
  footer:{
    padding:5,
    borderRadius:10,
    marginHorizontal:10,
    alignItems:"center",
    backgroundColor:'transparent'
  }
});
