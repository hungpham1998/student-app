import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import MainNavigator from './MainNavigator';

const mainStack = createSwitchNavigator({
  Main: MainNavigator,
});
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
