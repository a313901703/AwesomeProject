
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import Commstyles from '../../styles/comm';
import {  changeNums } from './actions'

export default class ProductItem extends Component{
    _changeNums(type,id){
        let {onChangeNums} = this.props
        onChangeNums && onChangeNums(type,id)
    }
    render(){
        let {item} = this.props
        return(
            <View style={styles.productBox}>
                <View style={{flex:1}}>
                    <Image style={styles.productImg} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/> 
                </View>
                <View style={styles.productInfo}>
                    <View>
                        <Text style={styles.productName} numberOfLines={2}>{item.product_name}</Text>
                    </View>
                    <View><Text style={styles.productFormat} numberOfLines={1}>{item.props}</Text></View>
                    <View style={styles.priceInfo}>
                        <Text style={styles.productPrice}>￥{item.price / 100}</Text>
                        <View style={styles.priceNum}>
                            <TouchableWithoutFeedback onPress={()=>this._changeNums('subtract',item.id)}>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNumMinus]}>
                                <Text>-</Text>
                            </View>
                            </TouchableWithoutFeedback>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNums]}>
                                <Text>{item.nums}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={()=>this._changeNums('add',item.id)}>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNumAdd]}>
                                <Text>+</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    productBox:{
        flexDirection: 'row',
    },
    productImg:{
        width:'100%',
        height:'100%',
    },
    productInfo:{
        flex:2,
        paddingLeft:10,
    },
    productName:{
        marginBottom:5,
        fontSize:12,
        //fontWeight:'bold',
        //color:'#222',
    },
    productFormat:{
        color:'gray',
        fontSize:10,
        marginBottom:5,
    },
    priceInfo:{
        flexDirection: 'row',
        position:'absolute',
        left:10,
        bottom:0,
    },
    productPrice:{
        color:'#ff0033',
    },
    priceNum:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'flex-end',
    },
    priceNumBox:{
        borderWidth:1,
        borderColor:'#f5f5f5',
        width:25,
    },
    priceNumMinus:{
        borderRightWidth:0,
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
    },
    priceNumAdd:{
        borderLeftWidth:0,
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
    },

});