import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import {Commstyles} from '../../styles/comm.js';

export default class EmptyAddress extends Component{
    render(){
        return (
            <View style={[styles.addressBox,Commstyles.absoluteCenter]}>
                <View>
                    <Text>您还没有添加收货地址,
                        <Text style={{color:global.orangeColor}}>点击添加</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addressBox:{
        flex:1,
    },
})

//export default connect(mapStateToProps)(EmptyAddress);