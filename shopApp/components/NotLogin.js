import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {Commstyles,windowWidth,windowHeight} from '../styles/comm.js';
import { Flex, WhiteSpace, Button} from 'antd-mobile';

class NotLogin extends Component {
    _login(){
        let { navigation } = this.props
        navigation.dispatch( {type:'signIn'} )
    }
    render() {
        return (
            <View style={[styles.container,Commstyles.absoluteCenter]}>
                <View style={styles.emptyMsg}>
                    <View style={[Commstyles.absoluteCenter]}>
                        <Image style={styles.emptyImg} source={require('../imgs/empty_order_blue.png')}/>
                    </View>
                    <View style={Commstyles.space}></View>
                    <Flex justify="center">
                        <Text>您还没有登录, 
                            <Text style={styles.loginText} onPress={()=>this._login()}>点击登录</Text>
                        </Text>
                    </Flex>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    emptyMsg:{
        width:windowWidth/2,
        height:windowWidth/2 + 30,
    },
    emptyImg:{
        width:128,
        height:88,
    },
    emptyText:{
        color:'gray',
        fontSize:13,
    },
    loginText:{
        color:global.themeColor,
    },

})
export default NotLogin;
