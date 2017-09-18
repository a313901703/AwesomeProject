/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import { StackNavigator,TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({tintColor})=>(<Icon name="ios-home-outline" size={25} color={tintColor}/>),
    };
    render() {
        return <Text>List of recent chats</Text>
    }
}
class Categories extends React.Component {
    render() {
        return <Text>List of all contacts</Text>
    } 
}

const MainScreenNavigator = TabNavigator({
    Home: { screen: Home },
    Categories: { 
        screen: Categories,
        navigationOptions: {
            tabBarLabel: '分类',
            tabBarIcon: ({tintColor})=>(<Icon name="ios-list-box-outline" size={25} color={tintColor} />),
        }
    }
},{
      animationEnabled: false, // 切换页面时是否有动画效果
      tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
      swipeEnabled: false, // 是否可以左右滑动切换tab
      backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
      tabBarOptions: {
          activeTintColor: '#ff3300', // 文字和图片选中颜色
          inactiveTintColor: '#DCDCDC', // 文字和图片未选中颜色
          showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
          indicatorStyle: {
              height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          }, 
          style: {
              backgroundColor: '#f5f5f5', // TabBar 背景色
              // height: 44
          },
          labelStyle: {
              fontSize: 10, // 文字大小
          },
      },
    
});


export default class App extends Component {
  render() {    
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
           <MainScreenNavigator /> 
        </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header:{
    height:50,
  }
});