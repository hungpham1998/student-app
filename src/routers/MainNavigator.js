import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "../features/02.app/01.home/Home";

import studentDetail from "../features/02.app/03.StudentDetail/StudentDetail";
import StudentinClass from "../features/02.app/02.Learnclass/StudentinClass";
import Learnclass from "../features/02.app/02.Learnclass/Learnclass";
import Specailized from "../features/02.app/04.Specailized/Specailized";


const TabBar = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Learnclass: { screen: Learnclass },
    // Detail: { screen: Detail }
    //   MessengerScreen: { screen: MessengerScreen },
    //   ProFileScreen: { screen: ProFileScreen }
  },
  {
    tabBarOptions: {
      activeTintColor: "#FFCB78",
      inactiveTintColor: "white",
      tabStyle: {
        backgroundColor: "#80dfff"
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  TabBar: {
    screen: TabBar,
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
  }
});
export default MainNavigator;
