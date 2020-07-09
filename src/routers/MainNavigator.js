import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "../features/02.app/01.home/Home";

import studentDetail from "../features/02.app/03.StudentDetail/StudentDetail";
import StudentinClass from "../features/02.app/02.Learnclass/StudentinClass";
import Learnclass from "../features/02.app/02.Learnclass/Learnclass";
import Specailized from "../features/02.app/04.Specailized/Specailized";
import Login from "../features/02.app/00.Login/login";
import AccountDetail from "../features/02.app/00.Login/AccountDetail";
import StudentPoint from "../features/02.app/03.StudentDetail/StudentPoint";
import StudentAttend from "../features/02.app/03.StudentDetail/StudentAttend";

const TabBar = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Learnclass: { screen: Learnclass },
  },
  {
    tabBarOptions: {
      activeTintColor: "#ffff00",
      inactiveTintColor: "white",
      tabStyle: {
        backgroundColor: "#87ceeb"
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  TabBar: {
    screen: TabBar,
    navigationOptions: {
      header: null
    }
  },
  AccountDetail: {
    screen: AccountDetail,
    navigationOptions: {
      header: null
    }
  },
  StudentinClass: {
    screen: StudentinClass,
    navigationOptions: {
      header: null
    }
  },
  StudentPoint: {
    screen: StudentPoint,
    navigationOptions: {
      header: null
    }
  },
  StudentAttend: {
    screen: StudentAttend,
    navigationOptions: {
      header: null
    }
  },
  studentDetail: {
    screen: studentDetail,
    navigationOptions: {
      header: null
    }
  },
  Specailized: {
    screen: Specailized,
    navigationOptions: {
      header: null
    }
  },
});
export default MainNavigator;
