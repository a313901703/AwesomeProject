import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TabBarIOS,
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

// import Login from './account/login.js';
// import Account from './account/index.js';
//import List from './index.js'; 
import AppWithNavigationState from './AppNavigator';
import AppReducer from './reducers/index';
//import Edit from './edit/index.js'; 
const themeColor = '#33ccff';

export default class IosMain extends Component{
    store = createStore(AppReducer);
    render() {
        return (
            <Provider store={this.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

//底部菜单 
// class TabbarView extends Component{
//     static defaultProps = {
//         title: '<TabBarIOS>',
//         desc: 'Tab-based navigation.',
//     }; 

//     constructor(props){
//         super(props);
//         this.state = {
//             user:'',
//             selectedTab: 'list',
//             notifCount: 0,
//             presses: 0,
//             logined:false,
//         };
//     }

//     componentDidMount(){
//         //this._asynAppStatus()
//     }

//     _asynAppStatus(){
//         let that = this
//         AsyncStorage.getItem('user')
//             .then((data)=>{
//                 let user,
//                     newState = {}

//                 if (data) {
//                     user = JSON.parse(data)
//                 }

//                 if (user && user.accessToken) {
//                     newState.user = user
//                     newState.logined = true
//                 }else{
//                     newState.logined = false
//                 }

//                 that.setState(newState)
//             })
//     }
//     afterLogin(user){
//         console.log(user)
//         let that = this
//         user = JSON.stringify(user)
//         console.log(user)
//         AsyncStorage.setItem('user',user)
//             .then(()=>{
//                 that.setState({
//                     logined:true,
//                     user:user,
//                 })
//             })
//             .catch((err)=>{
//                 console.log(err)
//             })
//     }

//     _logout(){
//         AsyncStorage.removeItem('user')
//         this.setState({
//             logined:false,
//             user:null,
//         })
//     }

//     render(){
//         // if (!this.state.logined) 
//         //     return <Login afterLogin={(e)=>this.afterLogin(e)}/>
//         return(
//             <TabNavigator >
//                 <TabNavigator.Item
//                     selected={this.state.selectedTab==='list'}
//                     title = '首页'
//                     titleStyle={{color:themeColor}}
//                     selectedTitleStyle={{color:themeColor}}
//                     renderIcon={()=><Icon name="ios-home-outline" size={25} color={themeColor} />}
//                     renderSelectedIcon={()=><Icon name="ios-home" size={25} color={themeColor} />}
//                     onPress={()=>this.setState({selectedTab:'list'})}>
//                     <List navigator={this.props.navigator}/>
//                 </TabNavigator.Item>
//                 <TabNavigator.Item
//                     selected={this.state.selectedTab==='category'}
//                     title = '分类'
//                     titleStyle={{color:themeColor}}
//                     selectedTitleStyle={{color:themeColor}}
//                     renderIcon={()=><Icon name="ios-list-box-outline" size={25} color={themeColor} />}
//                     renderSelectedIcon={()=><Icon name="ios-list-box" size={25} color={themeColor} />}
//                     onPress={()=>this.setState({selectedTab:'category'})}>
//                     <List/>
//                 </TabNavigator.Item>
//                 <TabNavigator.Item
//                     selected={this.state.selectedTab==='order'}
//                     title = '订单'
//                     titleStyle={{color:themeColor}}
//                     selectedTitleStyle={{color:themeColor}}
//                     renderIcon={()=><Icon name="ios-clipboard-outline" size={25} color={themeColor} />}
//                     renderSelectedIcon={()=><Icon name="ios-clipboard" size={25} color={themeColor} />}
//                     onPress={()=>this.setState({selectedTab:'order'})}>
//                     <List/>
//                 </TabNavigator.Item>
//                 <TabNavigator.Item
//                     selected={this.state.selectedTab==='Account'}
//                     title = '我的'
//                     titleStyle={{color:themeColor}}
//                     selectedTitleStyle={{color:themeColor}}
//                     renderIcon={()=><Icon name="ios-person-outline" size={25} color={themeColor} />}
//                     renderSelectedIcon={()=><Icon name="ios-person" size={25} color={themeColor} />}
//                     onPress={()=>this.setState({selectedTab:'Account'})}>
//                     <List/>
//                 </TabNavigator.Item>
//             </TabNavigator>
//         );
//     }
// }