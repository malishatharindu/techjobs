import { createAppContainer, createSwitchNavigator,  createBottomTabNavigator,} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Home';
import AuthLoad from './AuthLoad';
import AllJobs from '../../FindJobs/AllJobs';
import JobCat from '../../FindJobs/JobCat';
import AllJobsByCat from '../../FindJobs/AllJobsByCat';
import JobDetails from '../../FindJobs/JobDetails';
import AllConsultants from '../../Consultants/AllConsultants';
import ConListByCat from '../../Consultants/ConListByCat';
import ConsultantDetails from '../../Consultants/ConsultantDetails';
import SignUp from '../Login/SignUp';
import Login from '../Login/Login';
import LogoutButton from '../Login/LogoutButton';
import FooterTabs from '../FooterTabs';


const AppStack = createStackNavigator(
        { 
          FooterTabs:FooterTabs,
          Home:Home,
          AllConsultants:AllConsultants,
          ConListByCat:ConListByCat,
          ConsultantDetails:ConsultantDetails,
          AllJobs:AllJobs,
          AllJobsByCat:AllJobsByCat,
          JobDetails:JobDetails,
          JobCat:JobCat,
          SignUp:SignUp,
          Login:Login,
        });

const AuthStack = createStackNavigator({
        FooterTabs:FooterTabs,
         SignUp:SignUp,
         Login:Login,
        }); 

  const Navigator= createAppContainer(
      createSwitchNavigator(
        {
          AuthLoad: AuthLoad,
          AppStack: AppStack,
          AuthStack: AuthStack,
        },
        {
          initialRouteName: 'AuthLoad',
        }
      )
    );

    
export default Navigator;