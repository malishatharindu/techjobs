import * as React from "react";
import Moment from 'moment';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  AsyncStorage,
  Image,
  Alert
} from "react-native";
import {
  SearchBar,
  ListItem,
  TouchableScale,
  LinearGradient
} from "react-native-elements";
import { TabNavigator } from "react-navigation";
import { base_url, findJobs, asset_url } from "../Components/Service/ApiConfig";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class AllJobsByCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: "",
      data: [],
      upperLetter: "",
      cat:'',
      allJobsByCat:''
    };

    this.arrayholder = [];
  }

  static navigationOptions = {
    title: "Jobs by category"
  };

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1.5,
          width: "95%",
          alignSelf: "center",
          backgroundColor: "#e4e4e4"
        }}
      />
    );
  };

  fetchData = async () => {
    const {params}=this.props.navigation.state;
    const response = await fetch(base_url + findJobs, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token:"57c0722a550705800c3df7879ad33282f80d1cd0b2f09c08eb176932fe929357",

      })
    });
    const products = await response.json(); //products all array data
         
    this.setState({data: products["data"]});
    this.setState({cat: params.cat});
    var filterDataArray = [];
    this.state.data.forEach(element => {
      if (element['cat'] == this.state.cat) {
        filterDataArray.push(element);
        this.setState({allJobsByCat: filterDataArray});
        console.log(this.state.allJobsByCat);
      }
    });

    this.setState(
      {
        isLoading: false,
        //data: products["data"], 
      },

      function() {
        this.arrayholder = products["data"];
      }
    ).catch(error => {
      console.error(error);
    });
  };

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.job_title
        ? item.job_title.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      search: text
    });
  }
  componentDidMount() {
    this._retrieveTokenData();
  }
  async _retrieveTokenData() {
    this.setState({ token: await AsyncStorage.getItem("token") });
    this.fetchData();
  }

  render() {
    // console.log(this.state.data)
    console.log(this.state.upperLetter);
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
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.search}
        />

        <FlatList
          data={this.state.allJobsByCat}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigate("JobDetails", {
                  vacId: item.vacancy_id,
                  jobTitle: item.job_title
                })
              }
            >
              <View style={styles.listItemView}>
                <ListItem
                  Component={TouchableScale}
                  friction={90}
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.95}
                  title={
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      {item.company_logo_image == "" ? (
                        <View style={{ backgroundColor:'#f76f36',width: 40,height: 40,borderRadius:10,marginRight:5,alignItems:'center'}}>
                          <Text style={{fontSize:24,fontWeight:'800',paddingTop:5,color:'#fff'}}>
                            {item.job_title.charAt(0).toUpperCase()+item.job_title.slice(item.job_title.length)}
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Image
                            source={{uri:asset_url+`${item.company_logo_image}`}}
                            style={styles.logo}
                          />
                        </View>
                      )}
                      <View>
                        <Text style={{fontWeight:'700',fontSize:18,paddingRight:5,justifyContent:'flex-start'}}> {item.job_title}</Text>
                        <Text style={{fontWeight:'500',fontSize:14,color:"#717171",marginTop:4,paddingRight:5}} > {item.company_name}</Text>
                      </View>
                    </View>
                  }
                  titleStyle={{ color: "black", fontWeight: "bold" }}
                  subtitle={
                    <View style={styles.subtitleView}>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text
                          style={{
                            color: "#52556f",
                            fontWeight: "400",
                            marginTop: 15,
                            fontSize: 12  
                          }}
                        >
                          {Moment(Moment(item.closing_date).diff(Moment())).format("D [days], H [hours]")} left
                          {/* moment(props.startDatePicker).diff(props.endDatePicker, 'days'); */}

                        </Text>
                        {item.job_type === 1 ? (
                          <Text style={styles.jobType}>Part Time</Text>
                        ) : (
                          <Text style={styles.jobType}>Full Time</Text>
                        )}
                      </View>
                    </View>
                  }
                  subtitleStyle={{ color: "#f76f36" }}
                  chevron={{ color: "red" }}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 40,
    height: 40,
    borderRadius:10,
    marginRight:5,
    resizeMode: "contain"
  },
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ECECEC"
  },
  textStyle: {
    padding: 10
  },
  listItemView: {
    shadowColor: "#8A8A8A",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 3,
    shadowRadius: 4,
    margin: 16,
    marginBottom: 1,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 5
  },

  subtitleView: {
    flexDirection: "column",
    paddingTop: 5
  },
  jobType: {
    backgroundColor: "#fff",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 14,
    marginTop: 15,
    paddingLeft: 2,
    paddingRight: 3,
    color: "#f76f36"
  }
});
