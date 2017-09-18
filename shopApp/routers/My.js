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
  SectionList,
} from 'react-native';
//组件
import Icon from 'react-native-vector-icons/FontAwesome';
//css
import {Commstyles,themeColor} from '../styles/comm';

import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度
const windowHeight = Dimensions.get('window').height;   //屏幕高度

var data = [
    {data: [
        {'id':1,'name':'收货地址','icon':'map','iconColor':'#0099FF','desc':''},
    ], title: 'section1'},
    {data: [
        {'id':2,'name':'我的收藏','icon':'heart','iconColor':themeColor,'desc':''},
        {'id':3,'name':'优惠券','icon':'money','iconColor':'#FF9900','desc':'一些描述'},
    ], title: 'section2'},
    {data: [
        {'id':4,'name':'服务中心','icon':'thumbs-up','iconColor':'#0099FF','desc':''},
    ], title: 'section2'},
];

class Header extends Component{
    render(){
        return(
            <View style={styles.header}>
                <View style={styles.user}>
                    <View style={[styles.thumb,Commstyles.absoluteCenter]}>
                        <Icon name="user-o" size={30} color='#fff'/>
                    </View>
                    <View style={styles.userInfo}>
                        <View><Text style={styles.userName}>123abc12@</Text></View>
                        <View>
                            <Text style={styles.phone}><Icon name="mobile-phone" size={12} color='#fff' /> 15963912345</Text>
                        </View>
                    </View>
                    <View style={[styles.headerIcon,Commstyles.absoluteCenter]}>
                        <Icon name="chevron-right" size={14} color='#fff'/>
                    </View>
                </View>
            </View>
        );
    }
}
class Orders extends Component{
    render(){
        return(
            <View style={styles.orders}>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../imgs/card-2.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待付款</Text>
                    </View>
                </View>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../imgs/send.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待发货</Text>
                    </View>
                </View>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../imgs/receipt.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待收货</Text>
                    </View>
                </View>
                <View style={styles.orderItems}>
                    <Image style={styles.orderIcon} source={require('../imgs/eveluate.png')}/>
                    <View style={[Commstyles.absoluteCenter,{height:20}]}>
                        <Text style={styles.orderText}>待评价</Text>
                    </View>
                </View>
            </View>
        );
    }
}

class My extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        header:null
    });
    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <View style={styles.rows}>
            <View style={styles.rowsLeft}>
                <Text style={styles.rowsText}><Icon name={item.icon} size={16} color={item.iconColor}/>   {item.name}</Text>
            </View>
            <View style={styles.rowsRight}>
                <Text style={styles.rowsDesc}>{item.desc}   <Icon name='angle-right' size={16} color='gray'/></Text>
            </View>
        </View>
    );

    _ListHeaderComponent=() => (
        <View>
            <Header />
            <Orders />
        </View>
    )

    _ListFooterComponent=() =>(
        <View>
            <LoginOut />
        </View>
    )

    _separator = () => {
        return <View style={{height:0.7,backgroundColor:'#f8f8f8',paddingLeft:30,width:windowWidth}}/>;
    }
    render() {
        return(
            <SectionList
                style={Commstyles.container}
                renderItem={this._renderItem}
                renderSectionHeader={() => <View style={{height:10}}></View>}
                ItemSeparatorComponent={this._separator}
                sections={data}
                ListHeaderComponent={this._ListHeaderComponent}
                //ListFooterComponent={this._ListFooterComponent}
                keyExtractor = {this._keyExtractor}// 每个item的key
            />
        );
    }
}

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
export default My;
