import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
//css
import {Commstyles,windowWidth,windowHeight} from '../../styles/comm.js';

class OrderpRroductItem extends Component {
    static defaultProps = {
        uri:global.defaultImg,
    };
    render() {
        let uri = {uri:this.props.uri}
        let { item } = this.props
        console.log(item)
        //return (<View></View>);
        return (
            <View style={styles.orderItem}>
                <Image style={styles.productImg} source={uri}/>
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{item.product_name} </Text>
                    <Text style={styles.productFormat} numberOfLines={2}>{item.props}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.sale_price}>￥{item.price / 100} </Text>
                    <Text style={styles.grayText}> ×{item.nums} </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orderItem:{
        backgroundColor:'#fdfdfd',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:5,
        marginBottom:5,
    },
    productImg:{
        width:60,
        height:50,
    },
     productInfo:{
        paddingHorizontal:10,
        flex:1,
    },
    productName:{
        fontSize:13,
        marginBottom:3,
    },
    productFormat:{
        fontSize:12,
        color:'gray',
    },
    price:{
        width:80,
        alignItems:'flex-end',
    },
    sale_price:{
        //color:global.redColor,
        fontSize:13,
    },
    grayText:{
        color:'gray',
        fontSize:13,
    },
})

export default OrderpRroductItem;
