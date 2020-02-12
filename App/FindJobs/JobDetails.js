import * as React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform,AsyncStorage,Linking, Image,WebView } from 'react-native';
import { ListItem,TouchableScale,LinearGradient } from 'react-native-elements';

import { base_url, findJobs, asset_url } from '../Components/Service/ApiConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import Moment from 'react-moment';
 
export default class JobDetails extends React.Component {
    static navigationOptions = {
        title: "Details"
      };
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      data:[], 
      VacData:[]
    };
  }

  fetchData= async()=>{
    const { params } = this.props.navigation.state;
    const response= await fetch((base_url+findJobs), {
     method: 'POST', 
     headers: {
         Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
         //"token":"57c0722a550705800c3df7879ad33282f80d1cd0b2f09c08eb176932fe929357"
         "api_key":"12345"
      }),
  },
  );
    const  products = await response.json() //products all array data
    this.setState({
      isLoading: false,
      data:products['data'],
    },
     
      );
      var vacancyDetails = [];
      this.state.data.forEach(element => {
           if(element['vacancy_id'] === params.vacId && element['job_title']=== params.jobTitle ){
             vacancyDetails.push(element)
             }   
      });
      this.setState({VacData:vacancyDetails})
      .catch(error => {
        console.error(error);
      });
    };
    componentDidMount(){
     this._retrieveTokenData();
    }
    async _retrieveTokenData(){
      this.setState({token:await AsyncStorage.getItem('token')})
      this.fetchData();   
    }

    render() { 
      console.log(this.state.data)
      const { params } = this.props.navigation.state;
      if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
         );
     }
      return (
         <View style={styles.viewStyle}>
            <Text style={styles.topTitle}>{params.jobTitle}</Text>
          <FlatList
          data={this.state.VacData}
          renderItem={({ item }) => (
              <View>
    {item.company_logo_image == "" ? (<View></View>) :
            (<View>                       
                   <Image
                    style={{ height:150,flex:1,width:null }}
                    resizeMode="contain"    
                    source={{uri:asset_url+`${item.company_logo_image}`}}/>
                        </View>
                      )}
                    <View style={styles.detailView}>
                     <Text style={{fontWeight:'600',fontSize:18,marginBottom:20,marginRight:10,color:'#6f6f6f'}}>{item.company_name}</Text>
                     <View style={{flex:1,flexDirection:'row'}}><Text style={styles.contentTextFront}>Job Nature: </Text>
                     {item.job_type===1 ?<Text  style={{color:'#f76f36'}}>Part Time</Text>
                     :<Text  style={{color:'#f76f36'}}>Full Time</Text>}
                     </View> 

                    {/* Email */}
                     {item.email_address==null ?
                     <View>
                     </View>:
                     <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={styles.contentTextFront}>Email:</Text>
                     <Text style={styles.contentTextOther}>{item.email_address} </Text>
                     </View> 
                     }

                     {/* phone */}
                     {item.contact_no==null ?
                     <View>
                     </View>:
                     <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={styles.contentTextFront}>Phone:</Text>
                     <Text style={styles.contentTextOther}>{item.contact_no} </Text>
                     </View> 
                     }

                     {/* Monthly salary from */}
                     {item.salary_from==null ?
                     <View>
                     </View>:
                     <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={styles.contentTextFront}>Monthly salary from:</Text>
                     <Text style={styles.contentTextOther}>
                     Rs. {item.salary_from} </Text>
                     </View> 
                     }
        
                     {/* Monthly salary TO */}
                     {item.salary_to==null ?
                     <View>
                     </View>:
                     <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={styles.contentTextFront}>Monthly salary to:</Text>
                     <Text style={styles.contentTextOther}>Rs. {item.salary_to} </Text>
                     </View> 
                     }

                     {/* create Date */}
                     {item.created==null ?
                     <View>
                     </View>:
                     <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={styles.contentTextFront}>Created Date:</Text>
                     <Text style={styles.contentTextOther}>{item.created} </Text>
                     </View> 
                     }
                    {/* Closing Data */}
                    {item.closing_date==null ?
                     <View>
                     </View>:
                     <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={styles.contentTextFront}>Closing Date:</Text>
                     <Text style={styles.contentTextOther}>
                     {item.closing_date}
                   </Text>
                     </View> 
                     }
                     
                     </View>


                     <View style={styles.detailView}>
                     <View>
                        <Text style={styles.separateTitle}> Whom we are looking for</Text>
                        <Text>{item.job_description}</Text>
                     </View>
                     </View>

                    <View style={styles.detailView}>
                    {/* required Experience */}
                     {item.required_experience==null ?
                     <View></View>:
                     <View>
                     <Text style={styles.separateTitle} >Required Experience </Text>
                     <WebView
                          source={{
                            html: item.required_experience
                          }}
                          style={{ width:300,height:40, }}
                          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                          scalesPageToFit={false}
                          onLoadEnd={this._onLoadEnd}
                        />
                    </View>
                     }
                    </View>


                     <View style={styles.detailView}>
                     {item.required_qualification==null ?
                     <View></View>:
                     <View>
                     <Text style={styles.separateTitle} >Required Qualifications </Text>
                     <WebView
                          source={{
                            html: item.required_qualification
                          }}
                          style={{ width:300,height:60, }}
                          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                          scalesPageToFit={false}
                          onLoadEnd={this._onLoadEnd}/>
                    </View>
                     }
               </View>


                        <View style={styles.detailView}>
                        <View>
                        <Text style={styles.separateTitle} >Job Features & Overview </Text>
                        <View>
                        <Text style={styles.contentTextFront}>Responsibility:</Text>
                        <WebView
                          source={{
                            html: item.required_experience
                          }}
                          style={{ width:300,height:40, }}
                          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                          scalesPageToFit={false}
                          onLoadEnd={this._onLoadEnd}
                        />
                        </View>
                        
                        <Text style={styles.contentTextFront}>Age Range:  {item.age_from==null || item.age_from==null ?<Text>Not available</Text>:<Text>{item.age_from} to {item.age_to} </Text>}</Text>
                     
                       <Text style={styles.contentTextFront}>Job Vacancy:</Text>
                        <TouchableOpacity  onPress={() => Linking.openURL(item.vacancy_url)}
                         style={{backgroundColor:'#f76f36',alignItems:'center',borderRadius:6}}>
                        <Text style={{color: '#fff',padding:4,fontWeight:'700',paddingVertical:18,fontSize:16}}> View Source </Text>
                        </TouchableOpacity>
                     </View>
                     </View>
              </View> )}/>
          </View>
    );
  }
}
 
const styles = StyleSheet.create({
  viewStyle: {
    //justifyContent: 'center',
    flex: 1,
    backgroundColor:'#ececec',
  },
  topTitle:{
  textAlign:'center',
  fontWeight: 'bold',
  fontSize:18,
  backgroundColor:'#0a78b2',
  paddingBottom:8,
  paddingTop:8,
  paddingLeft:3,
  color:'#fff',
  marginBottom:7
},
  contentTextFront:{
    fontWeight:'600',
    fontSize:15,
    marginBottom:20,
    marginRight:10,
    color:'#6f6f6f'
  },
  contentTextOther:{
    fontWeight:'600',
    fontSize:15,
    marginBottom:20,
    marginRight:10,
    color:'#0a78b2'
  },

    separateTitle:{
        fontSize:16,
        fontWeight:'600',
        marginBottom:5,
        marginTop:5
    },
  jobType:{
    backgroundColor:'#f76f36',
    alignSelf: 'flex-start',
    marginLeft:2,
    paddingLeft:3,
    paddingRight:3,
    color:'#fff'},

    detailView:{
        backgroundColor:'#fff',
        flex: 1,
        margin: 2,
        borderRadius:4,
        paddingTop:20,
        padding:10,
        paddingBottom:20,
        shadowColor: "#c2d0d4",
        shadowOffset: { width:2, height:2 },
        shadowOpacity: 3,
        shadowRadius: 3,
        marginBottom:12
    },
    webView :{
      width :300
    }
});