import * as React from "react";
import {Text,View,StyleSheet,FlatList,ActivityIndicator,Platform,AsyncStorage,Image,SafeAreaView} from "react-native";
import { SearchBar,ListItem,TouchableScale,  Header} from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { TabNavigator, ScrollView } from "react-navigation";
import { base_url, findJobs } from "../Components/Service/ApiConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';


export default class JobCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: "",
      data: []
    };
    this.arrayholder = [];
  }

  static navigationOptions = {
    title: "Job Categories"
  };

  fetchData = async () => {
    const response = await fetch(base_url + findJobs, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token:
          "57c0722a550705800c3df7879ad33282f80d1cd0b2f09c08eb176932fe929357"
      })
    });
    const products = await response.json(); //products all array data
    this.setState(
      {
        isLoading: false,
        data: products["data"]
      },

      function() {
        this.arrayholder = products["data"];
      }
    ).catch(error => {
      console.error(error);
    });
  };

  componentDidMount() {
    this._retrieveTokenData();
  }
  async _retrieveTokenData() {
    this.setState({ token: await AsyncStorage.getItem("token") });
    this.fetchData();
  }

  render() {
    //console.log(this.state.data);
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.viewStyle}>
          <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={({ item }) => (
     
            <View style={styles.tiles}>
            <TouchableOpacity 
           onPress={() =>navigate("AllJobsByCat", {cat: item.cat,jobTitle: item.job_title})}>
                <Text style={styles.tileText}>{item.cat}</Text>
                </TouchableOpacity>
                </View>
          )} 
          keyExtractor={(item, index) => index.toString()
          }
         
           />
    <FloatingAction
    floatingIcon={
    <Text style={{color:'#fff',fontWeight:'700',fontSize:16}}>All Jobs</Text>
    }
    color={'#0a78b2'}
    buttonSize={80}
    animated={true}
    position={"right"}
      onPressMain={() => navigate("AllJobs",)}
  />
  </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffceb2"
  },
  textStyle: {
    padding: 10
  },

  tiles:{
    flex: 1,
    margin: 18,
   backgroundColor: "#ecf4ff",
    borderRadius:10,
    justifyContent:'center',
    padding:8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  elevation: 6,
      height:145,
      width:20
    },
  tileText:{
    color:'#464646',
    fontWeight:'700',
    fontSize:16,
    alignSelf:'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});
