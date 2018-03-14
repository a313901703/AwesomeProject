/**
 * 主文件
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
//组件
import { List,Toast,ActivityIndicator } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { init } from './actions.js'
//css
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';
import { ListItemStyle } from '../../styles/theme.js'
import { routers } from '../common/actions.js'

const Item = List.Item;

class Header extends Component{
    _userInfo(){

    }
    _login(){
        let { navigation } = this.props
        navigation.dispatch( {type : 'signIn'} ) 
    }
    _userInfo(){
        let { navigation } = this.props
        navigation.dispatch( routers('UserInfo') ) 
    }
    render(){
        let user = this.props.user
        return(
            <View style={styles.header}>
                <View style={styles.user}>
                    <View style={[styles.thumb,Commstyles.absoluteCenter]}>
                        <Icon name="user-o" size={30} color='#fff'/>
                    </View>
                    {
                        user.auth_key ? 
                        <TouchableWithoutFeedback onPress={()=>this._userInfo()}>
                        <View style={styles.userInfo}>
                            <View><Text style={styles.userName}>YIi_shop__15102939462028</Text></View>
                            <View>
                                <Text style={styles.phone}><Icon name="mobile-phone" size={12} color='#fff' /> 15993777272</Text>
                            </View>
                        </View></TouchableWithoutFeedback> : 
                        <TouchableWithoutFeedback onPress={()=>this._login()}>
                        <View style={styles.userInfo}>
                            <View><Text style={styles.userName}>请登录</Text></View>
                        </View>
                        </TouchableWithoutFeedback>
                    }
                    <View style={[styles.headerIcon,Commstyles.absoluteCenter]}>
                        <Icon name="chevron-right" size={14} color='#fff'/>
                    </View>
                </View>
            </View>
        );
    }
}
class MyOrder extends Component{
    _onPress(status){
        let navigation = this.props.navigation
        navigation.dispatch(routers('Orders',{status}))
    }
    render(){
        return(
            <View style={styles.orders}>
                <TouchableWithoutFeedback onPress={()=>this._onPress(0)}>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../../imgs/card-2.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待付款</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this._onPress(1)}>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../../imgs/send.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待发货</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this._onPress(2)}>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../../imgs/receipt.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待收货</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this._onPress(3)}>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../../imgs/eveluate.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待评价</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class My extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        header:null
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            height: windowHeight,
        };
    }

    componentDidMount() {
        let {navigation} = this.props
        navigation.dispatch( init() )
    }

    _onPress(router){
        let {navigation} = this.props
        router && navigation.dispatch(routers(router))
    }

    _ListFooterComponent=() =>(
        <View>
            <LoginOut />
        </View>
    )

    _list(){
        let { router } = this.props
        let data = [
            [
                {'id':1,'name':'收货地址','icon':'map','iconColor':'#0099FF','desc':'','router':'Address'},
            ],
            [
                {'id':2,'name':'我的收藏','icon':'heart','iconColor':themeColor,'desc':''},
                {'id':3,'name':'优惠券','icon':'money','iconColor':'#FF9900','desc':''},
            ],
            [
                {'id':4,'name':'服务中心','icon':'thumbs-up','iconColor':'#0099FF','desc':''},
            ],
        ];
        let listitems = [];
        for (var i = 0; i < data.length; i++) {
            let _listitems = []
            listitems.push(<View style={[Commstyles.space,{backgroundColor:"#fbfbfb"}]} key={'space' + i}></View>)
            let items = data[i]
            for(let v of items){
                _listitems.push(<Item 
                    arrow='horizontal'
                    onClick={()=>this._onPress(v.router)} 
                    thumb={<Icon name={v.icon} size={17} color={v.iconColor}/>} 
                    extra={v.desc} 
                    styles={StyleSheet.create(ListItemStyle)}
                    key={v.id} >
                      {'  ' + v.name}
                    </Item>)
            }
            listitems.push(<List key={'section' + i}>{_listitems}</List>)
        }
        return (
            <List>
                {listitems}
            </List>
        );
    }

    render() {
        let { user ,navigation} = this.props
        return (
            <View style={Commstyles.container}>
                <Header user={user} navigation={navigation}/>
                <MyOrder navigation={navigation}/>
                {this._list()}
            </View>
        );
    }
}
const mapStateToProps = state => ({
    user:state.user
});

const styles = StyleSheet.create({
    header:{
        padding:15,
        paddingTop:30,
        //flexDirection: 'row',
        backgroundColor:themeColor,
    },
    user:{
        flexDirection: 'row',
    },
    thumb:{
        width:windowWidth/6,
        height:windowWidth/6,
        borderRadius:windowWidth/12,
        backgroundColor:"rgba(255,255,255,0.4)",
    },
    userInfo:{
        flex:1,
        paddingLeft:10,
        justifyContent:'center',
    },
    userName:{
        fontSize:14,
        color:'#fff',
        marginBottom:8,
        fontWeight:'bold',
    },
    phone:{
        fontSize:12,
        color:"#fff",
    },
    headerIcon:{
        width:30,
        height:windowWidth/6,
    },
    orders:{
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingVertical:10,
        backgroundColor:"#fff",
    },
    orderItems:{
        width:45,
        height:65,
    },
    orderIcon:{
        width:'100%',
        height:40,
        resizeMode:Image.resizeMode.stretch,
    },
    orderText:{
        fontSize:11,
        color:'#333',
    },
    rows:{
        padding:10,
        backgroundColor:"#fff",
        flexDirection: 'row',
        paddingHorizontal:20,
    },
    rowsLeft:{
        flex:1,
        alignItems:'flex-start',
    },
    rowsRight:{
        flex:1,
        alignItems:'flex-end',
    },
    rowsText:{
        fontSize:16,
    },
    rowsDesc:{
        fontSize:11,
        color:'gray',
    },

});
export default connect(mapStateToProps)(My);