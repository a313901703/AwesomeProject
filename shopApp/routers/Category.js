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
  FlatList
} from 'react-native';
//组件
import Icon from 'react-native-vector-icons/Ionicons';
//css
import Commstyles from '../styles/comm';

import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度

var data = [{'id':1,'name':'name_1'},{'id':2,'name':'name_2'},{'id':3,'name':'name_3'},{'id':4,'name':'name_4'},{'id':5,'name':'name_4'}];
class Caregory extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '全部分类',
    });

    _renderItem = ({item}) => (
        <View style={styles.item} key={item.id}>
            <View style={styles.cate}>
                <Image style={styles.cateImg}  source={{uri: 'http://ooafrn5be.bkt.clouddn.com/category2.png'}}/>
                <View style={[Commstyles.absoluteCenter,{height:19}]}>
                    <Text style={Commstyles.fontNormal}>{item.name}</Text>
                </View>
            </View>
        </View>
    );
    _ItemSeparatorComponent=() => (
        <View style={{height:5}}></View>
    )

    _ListFooterComponent=() => (
        <View style={[Commstyles.absoluteCenter,{height:19,marginTop:20}]}>
            <Text style={Commstyles.fontNormal}>{'no more'}</Text>
        </View>
    )

    _keyExtractor = (item, index) => item.id;
    render() {
        return(
            <FlatList 
                style={Commstyles.container}
                data={data}
                ListFooterComponent={this._ListFooterComponent}
                keyExtractor = {this._keyExtractor}// 每个item的key
                numColumns = {4}
                renderItem = {this._renderItem}
                //ItemSeparatorComponent={this._ItemSeparatorComponent}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        width: (windowWidth - 1) / 4,
        height: ((windowWidth - 1) / 4) + 20,
        alignItems: 'center',
    },
    cate:{
        width:windowWidth/4 - 20,
        height:windowWidth/4,
    },
    cateImg:{
        width:'100%',
        height:windowWidth/4 - 20,
    }
});
export default Caregory;
