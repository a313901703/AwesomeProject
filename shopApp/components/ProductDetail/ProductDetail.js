import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

//组件
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import SliderModule from '../common/slider';    //轮播
import ProductInfo from './ProductInfo'
//import Formats from './Formats'
import Comment from './Comment'
import ProductDesc from './ProductDesc'
import ProductParams from './ProductParams'
import ProductFormats from './ProductFormats.js'
import Alert from '../Alert'

import {productInfo,productParmas,init,addToCart,collect,goCart} from './actions.js'
import { routers } from '../common/actions'
//css
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';
import { SListItemStyle } from '../../styles/theme.js'
import { List,Toast,Modal } from 'antd-mobile';

const Item = List.Item;

class BottomMenu extends Component{
    _addCart(){
        let {dispatch,productInfo} = this.props;
        dispatch(addToCart(productInfo['id']))
    }

    _collect(){
        let { productInfo,dispatch } = this.props
        status = productInfo.collection ? 0 : 1;
        dispatch(collect(productInfo.id,status))
    }

    _goCart(){
        let { productInfo,dispatch } = this.props
        dispatch( routers('PayCart') )
    }

    render(){ 
        let { productInfo } = this.props  
        //collection = productInfo.collection ? productInfo.collection : 0;
        return(
            <View style={styles.bottomMenu}>
                <TouchableWithoutFeedback onPress={()=>this._collect()}>
                <View style={[styles.bottomMenuItem,Commstyles.absoluteCenter]}>
                    {
                        productInfo.collection ? 
                            <Ionicon name='ios-star' color={global.redColor} size={20}/> :
                            <Ionicon name='ios-star-outline' size={20}/>
                    }
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this._goCart()}>
                <View style={[styles.bottomMenuItem,Commstyles.absoluteCenter,styles.payCart]}>
                    <Ionicon name='ios-cart-outline' size={20}/>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this._addCart()}>
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

    constructor(props) {
        super(props);
        this.state = { 
            visibleFormats: false,
            visibleParams:false,
        };
    }
     //初始化
    componentDidMount(){
        let navigation = this.props.navigation;
        if (navigation && navigation.state.params) {
            navigation.dispatch(productInfo(navigation.state.params.id))
        }
    }

    _ProductParams(state = {params:false,formats:false}){
        let navigation = this.props.navigation;
        if (navigation) {
            navigation.dispatch(productParmas(state))
        }
    }

    _modelVisible(visible){
        this.setState(visible)
    }
    
    render(){
        let {dispatch,navigation,products,choose} = this.props;
        products = products.products
        let id = navigation.state.params.id;
        let endFetching = false
        let product = products[id]
        return(
            <View style={[Commstyles.container,{paddingBottom:40}]}>
                <ScrollView style={{flex:1}}>
                    <GoBack dispatch={dispatch}/>
                    <SliderModule section='轮播' height={300} sliderImgs={product.carousels}/> 
                    <ProductInfo data={product}/> 
                    <List>
                        <Item arrow='horizontal' onClick={()=>this._modelVisible({visibleParams:true})} styles={StyleSheet.create(SListItemStyle)} >
                            产品参数
                        </Item>
                        <Item arrow='horizontal' onClick={()=>this._modelVisible({visibleFormats:true})} styles={StyleSheet.create(SListItemStyle)} >
                            选择规格
                        </Item>
                    </List>
                    <View style={Commstyles.space}></View>
                    <Comment />
                    <ProductDesc />
                </ScrollView>
                <ProductParams visible={this.state.visibleParams}  handClick={()=>this._modelVisible({visibleParams:false})}/>
                <ProductFormats visible={this.state.visibleFormats} 
                    handClose={()=>this._modelVisible({visibleFormats:false})} 
                    changeProductParams={(state)=>this._ProductParams(state)} 
                    productinfo={product}
                />
                <BottomMenu productInfo={products[id]} dispatch={dispatch}/>
            </View>
        );
    }
} 

const mapStateToProps = state => ({
    items:state.cart.items,
    products:state.products,
    choose:state.chooseFormat,
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
        backgroundColor:global.redColor,
    },
    bottomMenuText:{
        color:'#fff',
    },
})
export default connect(mapStateToProps)(ProductDetail);
