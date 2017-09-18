import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../AppNavigator';

//Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const initialNavState = AppNavigator.router.getStateForAction(
//   firstAction
// );

function nav(state, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
        break;
    case 'Logout':
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Login' }),
            state
        ) ;
        break;
    case 'goBack':
        nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
        break;
    case 'routers':
        let routeName = action.routeName
        let params    = action.params
        console.log(params)
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: routeName,params:params}),
            state
        );
        break;    
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const modalVisible = false;
function modal(state = modalVisible, action) {
    return state = action.type == 'show' ? true : false;
}

const AppReducer = combineReducers({
  nav,
  auth,
  countDown,
});

export default AppReducer;
