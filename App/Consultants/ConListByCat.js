import React, { Component } from 'react'
import { Text, View,FlatList, Image,Alert,AsyncStorage,StyleSheet,TouchableOpacity, ScrollView,Dimensions} from 'react-native'

import { base_url, getMemberList } from '../Components/Service/ApiConfig';

export default class ConListByCat extends React.Component {
    static navigationOptions = {
        title: 'List By Category',
        headerTransparent: false
      };
    state={
       data1:[],
       data2:[],
       token:'1234',
       conFieldId:'',
       conFieldName:'',
       catList:[],
    }
  
    fetchData= async()=>{
       const {params}=this.props.navigation.state;
       const response= await fetch((base_url+getMemberList), {
        method: 'POST', 
        headers: {
            Accept: 'application/json',
           'Content-Type': 'application/json',  
         },
         body: JSON.stringify({
            "category": "1",
            "token":"57c0722a550705800c3df7879ad33282f80d1cd0b2f09c08eb176932fe929357"
         }),
     },
     );
       const  products = await response.json() 
       this.setState({data1:products['data1']}); //consultant Details
       this.setState({data2:products['data2']}); //field details
       this.setState({conFieldId:params.con_field_id}); 
       this.setState({conFieldName:params.con_field_name}); 
          
      // console.log(this.state.data1);
      // console.log('aSDAAdxAD');
       //console.log(this.state.data2[0]['con_field_id']);
      // console.log(this.state.data2);
     var arrone = [];
     this.state.data2.forEach(element => {
          if(element['con_field_id'] == this.state.conFieldId ){
            arrone.push(element)
            }   
     });
     var conlistarray =[];
     this.state.data1.forEach(element => {
          if(element['con_field_id'] == this.state.conFieldId ){
            conlistarray.push(element)
            }   
     });
     this.setState({catList:conlistarray});
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
         const {navigate}=this.props.navigation;   
         return (

            <ScrollView>   
            <View style={{backgroundColor: 'rgba(400, 456, 456, 0.1)'}} >
            <View style={styles.header}>
            <View>
               <Text style={styles.headerText}>Best Place for Find Career</Text>
            </View>
            </View>
       
            
            {/* All Consultant list */}
         
         <View  style={{backgroundColor:'#f9f9f9',}}>
         <Text style={styles.titleText}>{this.state.conFieldName}</Text> 
            <FlatList
               data={this.state.catList}
               renderItem={({item})=>
      <TouchableOpacity
              onPress= {()=> navigate('ConsultantDetails',{user_id:item.user_id})}>
          <View style={styles.card}>
         <View style={{flex:1,flexDirection:'column'}}>
         <Text style={styles.con_field_name}>{item.con_field_name}</Text>
         
          <Text style={styles.position}>{item.position}</Text>    
          <Text style={styles.experience_years}>Experienced Years {item.experience_years}</Text>
         </View>
         </View>
       </TouchableOpacity>}
       />
       </View>
      </View>
      </ScrollView>
         );
    }
}



const styles = StyleSheet.create({
   container:{
    
   },

   header:{
      backgroundColor:"rgba(247,111,54,1)",
      height: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 650,
   },
   headerText:{
      color:"#fff",
      fontWeight:"700",
      fontSize:20,
      paddingLeft:20,
      paddingTop:5
   },

   descriptionText:{
      marginTop:5
   },

   card:{
      padding:12,
      backgroundColor:'#fff',
      margin:8,
      borderRadius:3,
      marginBottom:10,
      elevation:1,
      shadowOpacity: 0.3,
   },
   con_field_name: {
      fontSize: 18,
      fontWeight:'700' ,  
      marginBottom:3
      },
   con_field_nameTop: {
         fontSize: 14,
         fontWeight:'900' ,  
         marginBottom:5
         },
   position: {
        fontSize: 15,
        fontWeight:'500',
        color:'#737373'
        },


   experience_years:{
      backgroundColor:'green',
      alignSelf: 'flex-start',
      padding:3,
      marginLeft:5,
      marginBottom:5,
      fontWeight:'500',
      fontSize:12,
      color:'#fff'  
   },
   titleText:{
      fontSize:20,
      fontWeight:'700',
      paddingLeft:20,
      paddingTop:15,
      marginBottom:8,
      color:'#949494'
   }
 });
 


