import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';

class OrdersEmpty extends Component {
    render() {
        return (
            <View style={[styles.container,Commstyles.absoluteCenter]}>
                <View style={styles.emptyMsg}>
                    <View style={[Commstyles.absoluteCenter]}>
                        <Image style={styles.emptyImg} source={require('../../imgs/empty_order.png')}/>
                    </View>
                    <View style={[Commstyles.absoluteCenter,{height:30,marginTop:10}]}>
                        <Text style={styles.emptyText}>您还没有相关的订单</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        //backgroundColor: '#fbfbfb',
        // height:windowHeight /2,
        // width:windowWidth,
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
    }

})
export default OrdersEmpty;
