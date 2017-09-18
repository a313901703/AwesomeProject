import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator,TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import My from './routers/My';
import Home from './index';
import Category from './routers/Category';
import PayCart from './routers/Paycart';
import ProductDetail from './routers/ProductDetail';

const themeColor = '#ff0033';
// import MainScreen from '../components/MainScreen';
// import ProfileScreen from '../components/ProfileScreen';
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
              // height: 44
          },
          labelStyle: {
              fontSize: 10, // 文字大小
          },
        },
});

export const AppNavigator = StackNavigator({
    Tab:{screen:Tab},  
    ProductDetail:{screen:ProductDetail},
    //WaitPrepare:{screen:WaitPrepare}
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
