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
import Swipeout from 'react-native-swipeout';
//css
import Commstyles from '../styles/comm';

import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度

var data = [{'id':1,'name':'name_1'},{'id':2,'name':'name_2'},{'id':3,'name':'name_3'},{'id':4,'name':'name_4'},{'id':5,'name':'name_4'}];

var swipeoutBtns = [
    {
        text: '删除',
        color:'#fff',
        backgroundColor:'#ff0033',
        //onPress:()=>(console.log(123)),
        underlayColor:'#ff0033',
    }
]

class ProductItem extends Component{
    render(){
        return(
            <View style={styles.productBox}>
                <View style={{flex:1}}>
                    <Image style={styles.productImg} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/> 
                </View>
                <View style={styles.productInfo}>
                    <View>
                        <Text style={styles.productName} numberOfLines={2}>三星SAMSUNG 48.9英寸的也能叫超级电视！！！？??????？？
                        </Text>
                    </View>
                    <View><Text style={styles.productFormat} numberOfLines={1}>重量：20kg,尺寸：65</Text></View>
                    <View style={styles.priceInfo}>
                        <Text style={styles.productPrice}>￥28899.00</Text>
                        <View style={styles.priceNum}>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNumMinus]}>
                                <Text>-</Text>
                            </View>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNums]}>
                                <Text>1</Text>
                            </View>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNumAdd]}>
                                <Text>+</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class Paycart extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '购物车',
    });

    _renderItem = ({item}) => (
        <Swipeout right={swipeoutBtns} backgroundColor={'#fff'}>
            <View style={styles.section} >
                <ProductItem item={item}/>
            </View>
        </Swipeout>
    );
    _ListFooterComponent=() => (
        <View style={[Commstyles.absoluteCenter,{height:19,marginTop:20}]}>
            <Text style={Commstyles.fontNormal}>{'no more'}</Text>
        </View>
    )
    _ItemSeparatorComponent=()=>(
        <View style={styles.itemLine}></View>
    )

    _keyExtractor = (item, index) => item.id;
    render() {
        return(
            <FlatList 
                style={Commstyles.container}
                data={data}
                //ListFooterComponent={this._listFooterComponent}
                //ListFooterComponent={this._ListFooterComponent}
                keyExtractor = {this._keyExtractor}// 每个item的key
                renderItem = {this._renderItem}
                ItemSeparatorComponent={this._ItemSeparatorComponent}
            />
        );
    }
}

const styles = StyleSheet.create({
    section:{
        padding:5,
        backgroundColor:'#fff',
        height:80,
    },
    itemLine:{
        height:3,
    },  
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
export default Paycart;
