
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import ListItem from '../ListItem';

var data = [
    {'name':'产品参数'},
    {'name':'选择规格'}
];
const Formats = () => (
    <View style={{marginBottom:10,backgroundColor:'#fff'}}>
        {
            data.map((item,i)=>{
                return (
                    <ListItem item={item} key={i} _key={i}/>
                )
            })
        }
    </View>
);

export default Formats;