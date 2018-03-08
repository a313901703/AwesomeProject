import React, { Component } from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Commstyles,windowWidth,windowHeight} from '../../styles/comm.js';

export default class ThirdPartSignin extends Component{
    render(){
        return(
            <View style={styles.contains}>
                <View style={[styles.flex,Commstyles.absoluteCenter]}>
                    <Text style={{color:'gray'}}>第三方登录一个也不支持ㄟ( ▔, ▔ )ㄏ</Text>
                </View>
                <View style={styles.ThirdPartSigninItems}>
                    <View style={styles.ThirdPartSigninItem}>
                        <Image source={require('../../imgs/QQ-2.png')} style={styles.itemImage}/>
                    </View>
                    <View style={styles.ThirdPartSigninItem}>
                        <Image source={require('../../imgs/wei-xin.png')} style={styles.itemImage}/>
                    </View>
                    <View style={styles.ThirdPartSigninItem}>
                        <Image source={require('../../imgs/weibo.png')} style={styles.itemImage}/> 
                    </View>
                    <View style={styles.ThirdPartSigninItem}>
                        <Image source={require('../../imgs/taobao-2.png')} style={styles.itemImage}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contains:{
        position:'absolute',
        bottom:30,
        left:0,
        height:80,
        width:windowWidth,
    },
    ThirdPartSigninItems:{
        marginTop:20,
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-around',
    },
    ThirdPartSigninItem:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    itemImage:{
        width:40,
        height:40,
        resizeMode:Image.resizeMode.stretch,
    },

})