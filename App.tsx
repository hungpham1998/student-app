

import React, { Component } from "react";
import MainNavigation from "./src/routers/MainNavigation";
import NavigationService from "./src/routers/NavigationService";
import { Ionicons } from '@exponent/vector-icons';
console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <MainNavigation
        ref={navigatorRef =>
          NavigationService.setTopLevelNavigator(navigatorRef)
        }
      />
    );
  }
}
