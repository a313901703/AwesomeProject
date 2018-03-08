import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator,TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import My from './components/UserCenter/index';
import UserInfo from './components/UserCenter/UserInfo.js'
import Home from './components/Home/index';
import ProductDetail from './components/ProductDetail/ProductDetail.js';
import Category from './components/Category/index.js';
import PayCart from './components/PayCart/index'
import SignIn from './components/Loign/signIn.js'
import Orders from './components/Orders/Orders.js'
import ConfirmOrder from './components/ConfirmOrder/index.js'
import Address from './components/Address/index.js'
import AddAddress from './components/Address/AddAddress.js'
import Pay from './components/Pay.js'
import Products from './components/Products/index.js'


const themeColor = global.themeColor

const Tab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            tabBarLabel:'首页',
            tabBarIcon: ({ tintColor,focused }) => (
                focused ? <Icon name="ios-home" size={25} color={tintColor} /> :
                <Icon name="ios-home-outline" size={25} color={tintColor} />
            ),
        }
    },
    Categores: {
        screen: Category,
        navigationOptions: {
            tabBarLabel:'分类',
            tabBarIcon: ({ tintColor,focused }) => (
                focused ? <Icon name="ios-list-box" size={25} color={tintColor} /> :
                <Icon name="ios-list-box-outline" size={25} color={tintColor} />
             ),
        }
    },
    PayCart: {
        screen: PayCart,
        navigationOptions: {
            tabBarLabel:'购物车',
            tabBarIcon: ({ tintColor,focused }) => (
                focused ? <Icon name="ios-cart" size={25} color={tintColor} /> :
                <Icon name="ios-cart-outline" size={25} color={tintColor} />
             ),
        }
    },
    My: {
        screen: My,
        navigationOptions: {
            tabBarLabel:'我的',
            tabBarIcon: ({ tintColor,focused }) => (
                focused ? <Icon name="ios-person" size={25} color={tintColor} /> :
                <Icon name="ios-person-outline" size={25} color={tintColor} />
             ),
        }
    }
  }, {
        initialRouteName:'Home',
        animationEnabled: false, // 切换页面时是否有动画效果
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 是否可以左右滑动切换tab
        //backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarOptions: {
          activeTintColor: themeColor, // 文字和图片选中颜色
          inactiveTintColor: '#999', // 文字和图片未选中颜色
          showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
          indicatorStyle: {
              height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          }, 
          style: {
              backgroundColor: '#fff', // TabBar 背景色
          },
          labelStyle: {
              fontSize: 10, // 文字大小
          },
        },
});

export const AppNavigator = StackNavigator({
    Tab:{screen:Tab},  
    ProductDetail:{screen:ProductDetail},
    SignIn:{screen:SignIn},
    PayCart:{screen:PayCart},
    Orders:{screen:Orders},
    ConfirmOrder:{screen:ConfirmOrder},
    Address:{screen:Address},
    AddAddress:{screen:AddAddress},
    Pay:{screen:Pay},
    Products:{screen:Products},
    UserInfo:{screen:UserInfo},
    }, { 
    navigationOptions:{  
        headerBackTitle:null,  
        headerTintColor:'#fff',  
        showIcon:true,  
        swipeEnabled:false,  
        animationEnabled:false,
        headerStyle:{
            backgroundColor: themeColor,
            height:50,
            paddingHorizontal:15,
            borderBottomColor:themeColor
        },
    },  
    mode:'card',
    initialRouteName:'Tab',
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});


export default connect(mapStateToProps)(AppWithNavigationState);
