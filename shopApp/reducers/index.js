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

function modal(state = false, action) {
    return action.type == 'modal' ? action.visible : state;
}

function sweetAlert(state = {
    visible:false,
    text:'',
    status:true
},action){
    switch(action.type){
        case 'sweetAlert':
            return Object.assign({},state,action)
        default:
            return state;
    }
}

function shoppingCart(state = {
    isFetching:false,
    fetchStatus:true,
    items:[],
},action){
    switch(action.type){
        case 'joining':
            return Object.assign({},state,{
                isFetching:true,
            })
        case 'joinSuccess':
            let items = [...state.items,action.items]
            return Object.assign({},state,{
                isFetching:false,
                items:items
            })
            //return [...state.items,action.data]
        default:
            return state;
    }
    //return action.type == 'joinCart' ? action.isFetch : state;
}

const AppReducer = combineReducers({
  nav,
  auth,
  modal,
  shoppingCart,
  sweetAlert
});

export default AppReducer;
