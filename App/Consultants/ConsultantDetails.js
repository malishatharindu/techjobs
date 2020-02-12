import React, { Component } from "react";
import { Text, View,Dimensions,  ActivityIndicator, FlatList,ScrollView,StyleSheet,AsyncStorage } from "react-native";

import {base_url,consultantDetails} from "../Components/Service/ApiConfig";
const { height } = Dimensions.get('window');

export default class ConsultantDetails extends Component {
  static navigationOptions = {
    title: "Consultant Details"
  };

  state = {
    scrollEnabled:false,
    token:'',
    details: [],
    detailsData: [],
    basic_info: [],
    district_info: [],
    edu_info: [],
    emp_info: [],
    language_info: [],
    member_info: [],
    train_info: [],
    isLoading: true,
  };
  async _retrieveTokenData(){
    this.setState({token:await AsyncStorage.getItem('token')})
     this.fetchData();
     }

  fetchData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch((base_url+consultantDetails),{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         // token: '57c0722a550705800c3df7879ad33282f80d1cd0b2f09c08eb176932fe929357',
          user_id: params.user_id
        })
      }
    );
    const details = await response.json(); //details all array data
    this.setState({ details: details });
    this.setState({ detailsData: details["data"] });
    this.setState({ basic_info: details["data"]["basic_info"] });
    this.setState({ district_info: details["data"]["district_info"] });
    this.setState({ edu_info: details["data"]["edu_info"] });
    this.setState({ emp_info: details["data"]["emp_info"] });
    this.setState({ language_info: details["data"]["language_info"] });
    this.setState({ member_info: details["data"]["member_info"] });
    this.setState({ train_info: details["data"]["train_info"], isLoading: false, });
    // this.setState({basicinfo:details['data']['basic_info']}); //filled data with dynamic array  //take exact value from json objects to array
    console.log(this.state.details);
    console.log(this.state.detailsData);
  };


  componentDidMount() {
    this._retrieveTokenData();
   
  }
  render() {
    const scrollEnabled = this.state.screenHeight > height;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={{flexGrow:1, padding: 7,justifyContent:'center', backgroundColor:'#e2e2e2'}}> 
      <View style={{backgroundColor: 'rgba(400, 456, 456, 0.1)'}} >

  
      <View style={styles.itemView} >
          <Text style={styles.title}>Executive Summary</Text>
          <FlatList
            scrollEnabled={this.state.scrollEnabled}
            data={this.state.basic_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
               <Text>{item.executive_summery}</Text>
                </View>)} />
        </View>
          {/*(1) Basic info */}
          <View style={styles.itemView} >
          <Text style={styles.title}>Basic Information</Text>
          <FlatList
           scrollEnabled={this.state.scrollEnabled}
            data={this.state.basic_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
               <View style={{flex: 1, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Nationality:  </Text>
               <View><Text style={styles.infoText}>{item.nationality}</Text></View>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Religion :  </Text>
               <Text style={styles.infoText}>{item.religion}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Date of Birth:  </Text>
               <Text style={styles.infoText}>{item.dob}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Gender:  </Text>
               <View>{item.gender===1 ?<Text style={styles.infoText}>Male</Text>:<Text style={styles.infoText}>Female</Text>}</View> 
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Civil Status :  </Text>
               <View>{item.civil_status===1 ?<Text style={styles.infoText}>Married</Text>:<Text style={styles.infoText}>Unmarried</Text>}</View>
              </View>

                {/* <View>{item.district===null ?<Text></Text>:<Text>{item.district}</Text>}</View> */}
              </View>
            )}/>
        </View>

        {/*(1) Edu info */}
        <View style={styles.itemView} elevation={1} >
          <Text style={styles.title}>Education Information</Text>
          <FlatList
            scrollEnabled={this.state.scrollEnabled}
            data={this.state.edu_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Degree Name :  </Text>
               <View style={{flex: 1}} >
                <Text style={styles.infoText}>{item.qual_title}</Text> 
                </View>
                </View>
               <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Institute :  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.qual_Institute}</Text> 
                </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Year-From :  </Text>
                <Text style={styles.infoText}>{item.qual_from}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Year-To:  </Text>
                <Text style={styles.infoText}>{item.qual_to}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Description:  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.qual_desc}</Text>
               </View>
                </View>
                <View style={{borderBottomColor: '#ffcd91',borderBottomWidth: 1,marginTop:5}}/>
                {/* <View>{item.district===null ?<Text></Text>:<Text>{item.district}</Text>}</View> */}
              </View>
            )}
          />
        </View>

        {/*(2) Emp info */}
        <View style={styles.itemView} >
          <Text style={styles.title}>Employee Information</Text>
          <FlatList
           scrollEnabled={this.state.scrollEnabled}
            data={this.state.emp_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
                  <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Designation :  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.position}</Text>
               </View>
                </View>
               <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Date From :  </Text>
               <Text style={styles.infoText}>{item.date_from}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Date To :  </Text>
               <Text style={styles.infoText}>{item.date_to}</Text>
                </View>
                <View style={{flexGrow: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Description :  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.description}</Text>
               </View>
                </View>
                {/* <View>{item.district===null ?<Text></Text>:<Text>{item.district}</Text>}</View> */}
              </View>
            )}
          />
        </View>

        {/*(3) Language info */}
        <View style={styles.itemView} >
          <Text style={styles.title}>Language Proficiency</Text>
          <FlatList
            scrollEnabled={this.state.scrollEnabled}
            data={this.state.language_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
            <View style={{borderBottomColor:'#ffd095',borderBottomWidth:1,marginTop:12 }}> 
            <Text style={{backgroundColor:'#ffead0',alignItems:'center',fontWeight:'600'}}>{item.language}</Text>
            </View>
             <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Reading:  </Text>
               <View>{(item.reading==='1')?<Text style={styles.infoText}>Excellent</Text>:(item.Reading=2)?
               <Text style={styles.infoText}>Good</Text>:
               <Text style={styles.infoText}>Poor</Text>}</View> 
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Speaking:  </Text>
               <View>{(item.speaking==='1')?<Text style={styles.infoText}>Excellent</Text>:
               (item.Reading=2)?<Text style={styles.infoText}>Good</Text>:<Text style={styles.infoText}>Poor</Text>}</View> 
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Writing:  </Text>
               <View>{(item.writing=1)?
               <Text style={styles.infoText}>Excellent</Text>:(item.Reading=2)?
               <Text style={styles.infoText}>Good</Text>:
               <Text style={styles.infoText}>Poor</Text>}</View> 
                </View>
              </View>
            )}
          />
        </View>

        {/*(4) Member info */}
        <View style={styles.itemView} >
          <Text style={styles.title}>Member Information</Text>
          <FlatList
            scrollEnabled={this.state.scrollEnabled}
            data={this.state.member_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Title:  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.qual_title}</Text>
                </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Institute :  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.qual_Institute}</Text>
                </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Date From :  </Text>
               <Text style={styles.infoText}>{item.qual_from}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Date To :  </Text>
               <Text style={styles.infoText}>{item.qual_to}</Text>
                </View>
              </View>
            )}
          />
        </View>

         {/*(5) Training info */}
          <View style={styles.itemView} >
          <Text style={styles.title}>Training Information</Text>
          <FlatList
            scrollEnabled={this.state.scrollEnabled}
            data={this.state.train_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
               <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Title :  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.qual_title}</Text>
                </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Institute :  </Text>
               <View style={{flex: 1}} >
               <Text style={styles.infoText}>{item.qual_Institute}</Text>
                </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Date From :  </Text>
               <Text style={styles.infoText}>{item.qual_from}</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row',}}>
               <Text style={styles.rowTitle}>Date To :  </Text>
               <Text style={styles.infoText}>{item.qual_to}</Text>
                </View> 
             </View>
            )}
          />
        </View>
         {/* (6) District View */}
         <View style={styles.itemView} >
          <Text style={styles.title}>District Information</Text>
          <FlatList
            scrollEnabled={this.state.scrollEnabled}
            data={this.state.district_info}
            // keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View>
                <View>
                  {item.district === null ? (
                    <Text></Text>
                  ) : (
                    <Text style={styles.infoText}>{item.district}</Text>
                  )}
                </View>
              </View>
            )}
          />
        </View>  
        </View>
        </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1,
    justifyContent:'center',
    backgroundColor:'black',
   
  },
  itemView:{
    marginTop:10,
    padding:12,
    backgroundColor: "#fff",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.20,
shadowRadius: 1.41,

elevation: 2,
  },
  title:{
    fontSize:18,
    fontWeight:'600',
    padding:0,
    marginBottom: 5,
    backgroundColor:'#fff',
    color:'#394242'
  },

  rowTitle:{
    fontSize:14,
    fontWeight:'600'
  },
  infoText:{
    color:'#0a78b2'
  },
  header:{
    backgroundColor:"rgba(247,111,54,1)",
    height: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 550,
 },
 headerText:{
    color:"#fff",
    fontWeight:"700",
    fontSize:20,
    paddingLeft:20,
    paddingTop:5
 },
});
