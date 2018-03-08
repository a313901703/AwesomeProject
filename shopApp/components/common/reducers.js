import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../AppNavigator.js';
import {getResopnseData} from './func.js'

import {ALERT_WORING,ALERT_SUCCESS,ALERT_ERROR,ALERT_INIT,SIGN_IN} from './actions.js'
import { products  } from '../reducers/product'
import {productInfo,formats,chooseFormat,cart} from '../ProductDetail/reducers.js'
import {loginForm} from '../Loign/reducers.js'
import { payCart } from '../PayCart/reducers'
import { user } from '../UserCenter/reducers.js'
import { orders } from '../Orders/reducers.js'
import { address,district } from '../Address/reducers.js'
import { category } from '../Category/reducers.js'


function nav(state, action) {
  let nextState;
  switch (action.type) {
    case SIGN_IN:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'SignIn' }),
            state
        ) ;
        break;
    case 'SignIn':
    //case 'Logout':
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
            NavigationActions.navigate({ routeName: routeName,params}),
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

function nothing(state={},action){
  if (action.type == 'null') {
    return state;
  }
  return state;
}

const initAlertState = { visible : false ,type : ALERT_SUCCESS, message : '' };
function alert(state = initAlertState,action){
    switch (action.type) {
        case ALERT_INIT:
            return initAlertState
        case ALERT_WORING:
        case ALERT_SUCCESS:
        case ALERT_ERROR:
            return Object.assign({},state,{ 
                visible : true,
                type : action.type,
                message:action.message 
            })
        default :
            return state
    }
}

const AppReducer = combineReducers({
    alert,
    nothing,
    nav,
    //商品详情
    products,
    productInfo,
    //分类
    category,
    //Comment,
    formats,
    chooseFormat,
    cart,
    //登录注册
    loginForm,
    //购物车
    payCart,
    //用户
    user,
    //订单
    orders,
    //地址
    address,
    district,
});

export default AppReducer;
