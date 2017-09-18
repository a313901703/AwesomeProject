import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from 'react-native';
//组件
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import SliderModule from '../common/slider';    //轮播
import ProductInfo from '../components/ProductDetail/ProductInfo'
import Formats from '../components/ProductDetail/Formats'
import Comment from '../components/ProductDetail/Comment'
import ProductDesc from '../components/ProductDetail/ProductDesc'

import {modal} from '../actions/index'
//css
import {Commstyles,themeColor,windowWidth,windowHeight} from '../styles/comm';

class BottomMenu extends Component{
    _goPayCart(){
        //console.log()
    }
    render(){
        return(
            <View style={styles.bottomMenu}>
                <View style={[styles.bottomMenuItem,Commstyles.absoluteCenter]}>
                    <Ionicon name='ios-star-outline' size={20}/>
                </View>
                <View style={[styles.bottomMenuItem,Commstyles.absoluteCenter,styles.payCart]}>
                    <Ionicon name='ios-cart-outline' size={20}/>
                </View>
                <TouchableWithoutFeedback onPress={()=>this._goPayCart()}>
                <View style={[styles.bottomMenuItem,Commstyles.absoluteCenter,styles.goPayCart]}>

                    <Text style={styles.bottomMenuText}>加入购物车</Text>
                </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class GoBack extends Component{
    _goBack(){
        let navigation = this.props.navigation;
        navigation.dispatch({type:'goBack',_router:'what'})
    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={()=>this._goBack()}>
            <View style={[Commstyles.absoluteCenter,styles.goBack]}>
                <Icon name='angle-left' color='#fff' size={25}/>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

class ProductDetail extends Component{
    static navigationOptions = {
        header: null,
    };
    render(){
        let navigation = this.props.navigation;
        console.log(this.pops)
        return(
            <View style={[Commstyles.container,{paddingBottom:40}]}>
                <ScrollView style={{flex:1}}>
                    <GoBack navigation={navigation}/>
                    <SliderModule section='轮播' height={300}/> 
                    <ProductInfo /> 
                    <Formats />
                    <Comment />
                    <ProductDesc />
                </ScrollView>
                <BottomMenu />
                <Modal 
                    animationType={"fade"}
                    transparent={true}
                />
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    goBack:{
        position:'absolute',
        top:20,
        left:15,
        width:26,
        height:26,
        backgroundColor:"rgba(25,25,25,0.3)",
        'zIndex':1000,
        //borderColor:'gray',
        borderRadius:13,
    },
    bottomMenu:{
        position:'absolute',
        bottom:0,
        left:0,
        flexDirection: 'row',
        height:40,
        width:windowWidth,
        borderTopWidth:0.5,
        borderTopColor:'#e2e2e2',
    },
    bottomMenuItem:{
        flex:1,
        height:40,
        backgroundColor:'#fff',
    },
    payCart:{
        borderLeftColor:"#e2e2e2",
        borderLeftWidth:0.5,
    },
    goPayCart:{
        flex:2,
        backgroundColor:themeColor,
    },
    bottomMenuText:{
        color:'#fff',
    },
})

export default ProductDetail;