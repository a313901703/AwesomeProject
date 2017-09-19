import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Modal
} from 'react-native';
import { connect } from 'react-redux';

//组件
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import SliderModule from '../common/slider';    //轮播
import ProductInfo from '../components/ProductDetail/ProductInfo'
import Formats from '../components/ProductDetail/Formats'
import Comment from '../components/ProductDetail/Comment'
import ProductDesc from '../components/ProductDetail/ProductDesc'
import Modals from '../components/Modal'
import {modal,joinCart} from '../actions/index'
//css
import {Commstyles,themeColor,windowWidth,windowHeight} from '../styles/comm';

class BottomMenu extends Component{
    _goPayCart(){
        let {dispatch,isFetching} = this.props;
        //dispatch(modal(true))
        dispatch(joinCart())
        // this.timer = setTimeout(
        //    () => {dispatch(modal(false))},2000
        // );
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
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
        let dispatch = this.props.dispatch;
        dispatch({type:'goBack',_router:'what'})
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
        let {dispatch,isFetching} = this.props;
        console.log(this.props)
        return(
            <View style={[Commstyles.container,{paddingBottom:40}]}>
                <ScrollView style={{flex:1}}>
                    <GoBack dispatch={dispatch}/>
                    <SliderModule section='轮播' height={300}/> 
                    <ProductInfo /> 
                    <Formats />
                    <Comment />
                    <ProductDesc />
                </ScrollView>
                <Modals text='加入成功' visible={isFetching} transparent={true}/>
                <BottomMenu dispatch={dispatch} isFetching={isFetching}/>
            </View>
        );
    }
} 

// function mapStateToProps(state){
//     const {shoppingCart} = state
//     const {isFetching,items} = shoppingCart
//     return {shoppingCart,isFetching,items}
// }
const mapStateToProps = state => ({
    //shoppingCart: state.shoppingCart,
    isFetching:state.shoppingCart.isFetching,
    items:state.shoppingCart.items,
});

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
export default connect(mapStateToProps)(ProductDetail);
