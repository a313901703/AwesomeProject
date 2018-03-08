
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm';

const ProductInfo = ({data}) => (
    <View style={styles.sections}>
        <View style={styles.rows}>
            <Text style={Commstyles.productname}>{data.name}</Text>
        </View>
        <View style={styles.rows}>
            <Text style={styles.minFont}>{data.name}</Text>
        </View>
        <View style={styles.rows}>
            <Text style={styles.productPrice}>￥{data.price}   <Text style={styles.marketPrice}>￥{data.market_price}</Text></Text>
        </View>
        <View style={styles.rows}>
            <View style={{flex:1,alignItems:'flex-start'}}><Text style={styles.minFont}>快递：0.00</Text></View>
            <View style={{flex:1,alignItems:'center'}}><Text style={styles.minFont}>月销售{data.volume}</Text></View>
            <View style={{flex:1,alignItems:'flex-end'}}><Text style={styles.minFont}>山东青岛</Text></View>
        </View>
    </View>
);
const styles = StyleSheet.create({
    sections:{
        marginBottom:10,
        backgroundColor:'#fff',
        padding:10,
    },
    rows:{
        flexDirection: 'row',
        marginBottom:5,
    },
    productname:{
        fontSize:15,
    },
    productPrice:{
        fontSize:15,
        color:global.redColor,
    },
    productDesc:{
        fontSize:10,
        color:'gray',
    },
    marketPrice:{
        fontSize:12,
        color:'gray',
        textDecorationLine:'line-through',
    },
    minFont:{
        fontSize:12,
        color:'gray',
    },

});

export default ProductInfo;