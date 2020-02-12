import React, { Component } from 'react'
import { Text, View,FlatList, Image,Alert,AsyncStorage,StyleSheet,TouchableOpacity, ScrollView,Dimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { base_url, getMemberList } from '../Components/Service/ApiConfig';

export default class AllConsultants extends Component {
   static navigationOptions = {
      title: 'Consultant List',
      headerTransparent: false
    };
  state={
     data1:[],
     data2:[],
  }

  fetchData= async()=>{
     //const {params}=this.props.navigation.state;
     const response= await fetch(base_url+getMemberList, {
      method: 'POST', 
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'  
       },
       body: JSON.stringify({
          "category": "1"
       }),
   },
   );
     const  products = await response.json() //products all array data
     this.setState({data:products})
     this.setState({data1:products['data1']}); //user id there
     this.setState({data2:products['data2']});//filled data with dynamic array   
  };
  componentDidMount(){
  this._retrieveTokenData();
  }
  //retrieve user token 
   async _retrieveTokenData(){
     this.setState({token:await AsyncStorage.getItem('token')})
     this.fetchData();   
      }
   render() {
      //const scrollEnabled = this.state.screenHeight > height;
      const {navigate}=this.props.navigation;   
       return (

         <ScrollView > 
         <Text style={{alignSelf:'center',fontWeight:'800',padding:3}}> All Consultants </Text>  
            <Text style={styles.titleText}>Popular Categories</Text>
         {/* Popular categories */}
         
        
         <View style={{backgroundColor:'transparent',paddingVertical:10}}>
            <FlatList
               horizontal
               showsHorizontalScrollIndicator={false}
               data={this.state.data2}
               renderItem={({item})=> 

          <TouchableOpacity
               onPress= {()=> navigate('ConListByCat',{con_field_id:item.con_field_id,con_field_name:item.con_field_name})}>
              <View  style={styles.countView}>
           <Text style={styles.countText}>{item.total_number}</Text>
          <Text style={styles.con_field_nameTop}>{item.con_field_name}</Text>
          </View>
         </TouchableOpacity>
         }/>
       </View>


            {/* All Consultant list */}
         <View  style={{backgroundColor:'#bdbdbd38'}}>
         <Text style={styles.titleText}>All  Consultants</Text>
            <FlatList
               data={this.state.data1}
               renderItem={({item})=>
           <TouchableOpacity
              onPress= {()=> navigate('ConsultantDetails',{user_id:item.user_id})}>
          <View style={styles.card}>
        <View style={{flexDirection:'row'}}>
                        <View style={styles.hatText}>
                          <Text style={{fontSize:18,fontWeight:'800',paddingBottom:2,color:'#fff'}}>
                            {item.con_field_name.charAt(0).toUpperCase()+item.con_field_name.slice(item.con_field_name.length)}
                          </Text>
                        </View>
                        <View style={{flex:1,flexDirection:'column'}}>
          <Text style={styles.con_field_name}>{item.con_field_name}</Text>
          <Text style={styles.position}>{item.position}</Text>      
         </View>      
         </View>
         </View>
         </TouchableOpacity>}/>
       </View>
       </ScrollView>
      )
   }
}
const styles = StyleSheet.create({
 
   countView:{
      padding:6,
      backgroundColor:'#ffefdc',
      margin:8,
      borderRadius:5,
      
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
      width:120,
      height:120,
      justifyContent:'center'
   },

   countText:{
      color:"#000",
      fontWeight:'800',
      alignSelf:'center',
      fontSize:28,
      padding:5,
      marginBottom:2
   },

   con_field_nameTop: {
      fontSize: 14,
      fontWeight:'700' ,  
      marginBottom:3,
      color:'#000',
      alignSelf:'center',
      textAlign:'center'
      },

   descriptionText:{
      marginTop:5
   },

   card:{
      padding:15,
      backgroundColor:'#fff',
      margin:8,
      borderColor:'#ccc',
      borderWidth:1,
      borderRadius:10,
      marginBottom:10,
  
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
   },
   con_field_name: {
      fontSize: 18,
      fontWeight:'700' ,  
      marginBottom:3
      },

   position: {
        fontSize: 15,
        fontWeight:'500',
        color:'#737373'
        },
   viewDetail: {
         backgroundColor: "#f76f36",
         padding:10,
         borderRadius:4,
         marginTop:30   
       },

   experience_years:{
      backgroundColor:'green',
      alignSelf: 'flex-start',
      padding:3,
      marginBottom:8,
      fontWeight:'500',
      fontSize:10,
      color:'#fff'  
   },
   titleText:{
      fontSize:18,
      fontWeight:'700',
      paddingLeft:20,
      paddingTop:15,
      marginBottom:5,
      color:'#565554'
      //color:'#0a78b2'
   },
   hatText:{
       backgroundColor:'#1478ad9e',
       width: 60,
       height: 60,
       borderRadius:30,
       marginRight:8,
       borderColor:'#fffcf2',
       borderWidth:2,
       alignItems:'center',
       justifyContent:'center'
      }
});
