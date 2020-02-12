import { createAppContainer } from 'react-navigation';
import React from 'react';
import {  Container, Header, Title, Content, Button, Left, Right, Body, Text, Icon, Footer, FooterTab } from 'native-base';
import { useState } from 'react';  
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Navigator from '../Components/Navigation/Navigator'
import AllJobs from '../FindJobs/AllJobs';
import AllConsultants from '../Consultants/AllConsultants';
import Login from './Login/Login';

const FooterTabs = createBottomTabNavigator(
  {
    Jobs: { screen: AllJobs,},
    Consultants: { screen: AllConsultants },
    Profile: {screen: Login}
  }, 
  {
    tabBarComponent: props => { 
      return (
        <Footer>
          <FooterTab>
            <Button 
              vertical 
              onPress={() => props.navigation.navigate('Jobs')}
            >
              <Icon name="search"/>
              <Text>Jobs</Text>
            </Button>
            <Button
              vertical 
              onPress={() => props.navigation.navigate('Consultants')}
            >
              <Icon name="briefcase" />
              <Text style={{fontSize:13}}>Consultants</Text>
            </Button>

            <Button
              vertical 
              onPress={() => props.navigation.navigate('Profile')}
            >
              <Icon name="contact" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);
export default createAppContainer(FooterTabs);



