import React, { Component } from "react";
import {  View,  Text,  TouchableOpacity,  TextInput,  StyleSheet,Alert,AsyncStorage, Image, KeyboardAvoidingView} from "react-native";
import { base_url, login} from '../../Components/Service/ApiConfig';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerTransparent: false
  };
  state = {
    key:'PGSG6C4D959D66D',
    deviceid:'355022063308295',
    username: "SANATH_J ",
    password: "12345",
    userData:[],
    token:'',
  };

  handleUsername = text => {
    this.setState({ username: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

  /*-----login action function------------*/
  _userLogin(key,deviceid, username, password) {
    fetch((base_url+login), {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key:key,
        deviceid:deviceid,
        username:username,
        password:password
      })
    })
      .then(response => response.json())
      .then(responseJson=> {
        var token= responseJson['user'][0].token;
        console.log(responseJson);
        this.setState({
           userData: responseJson['user'][0],
           token: '57c0722a550705800c3df7879ad33282f80d1cd0b2f09c08eb176932fe929357'
        });
           this._storeTokenData('token',this.state.token);
     })
      .done();
  }
 
//Store Token in device
async _storeTokenData(tokenIs, token) {
  const {navigate} = this.props.navigation;
   try {
    await AsyncStorage.setItem(tokenIs, token)
    navigate('AppStack', {name: 'home'})
  } catch (error) {
    console.log("AsyncStorage error: " + error.message);
  }
}
//retrieve user token 
async _retrieveTokenData(){
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
        Alert.alert("User Token is", value);
    }
  } catch (error) {
    Alert.alert("User Token is", 'no')
  }
}
  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
      <View>
       <Image
           style={styles.image}
          source={require('../../../assets/logo.png')}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="#0a78b2"
          autoCapitalize="none"
        //  onChangeText={this.handleUsername}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#0a78b2"
          autoCapitalize="none"
          secureTextEntry={true}
       // onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>this._userLogin(this.state.key,this.state.deviceid,this.state.username, this.state.password)}
          >
          <Text style={styles.submitButtonText}> Login </Text>
        </TouchableOpacity>
       </View>

       <View style={{alignItems: 'center',flexDirection:'row',alignSelf:'center',marginTop:'20'}}>
        <Text style={{ fontSize: 16,fontWeight:'600',color:'#c1c1c1'}}> Don't Have an Account? </Text>
        <TouchableOpacity
        onPress={() =>navigate('SignUp', {name: 'namef'})}>
        <Text style={{color:'#0a78b2',fontSize:16,fontWeight:'600',margin:7}}>Register</Text>
        </TouchableOpacity>
        </View>
    
      </KeyboardAvoidingView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex:1,
      justifyContent:'center'
    },
    image:{width: 200,
       height: 25, 
       alignSelf: 'center',
       marginBottom:35  
  },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center',
      fontWeight: '700'
    },
    button: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingVertical: 15
    },
   input: {
    height: 50,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#000',
    fontSize:14,
    borderColor:'#a2e3ff',
    borderBottomWidth:2,
    borderRadius:5,
    alignSelf: 'stretch',
  },
  submitButton: {
    backgroundColor: "#f76f36",
    padding: 10,
    height: 45,
    alignSelf: 'stretch',
  },
  submitButtonText: {
    color: "white",
    fontSize:16,
    textAlign:'center'
  },
  footer:{
    fontSize:30,
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
    alignItems:"center",
    backgroundColor:'#0a78b2'
  }
});
