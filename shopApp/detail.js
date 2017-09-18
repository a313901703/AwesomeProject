/**
 * 主文件
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
//模板
import { Container, Header, Title, Content,Left,Button, Body,Right,Thumbnail,ListItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
//组件
import SliderModule from './common/slider.js';    //轮播
import Icon from 'react-native-vector-icons/Ionicons';
//公共变量及方法
import {requestGet,requestPost} from './common/request.js';
import {config} from './common/config.js'; 
//css
import styles from './styles/ditail.js';

import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度
const windowHeight= Dimensions.get('window').height;   //屏幕高度
const themeColor  = '#33ccff';

//轮播
class Sliders extends Component {
    render(){
        return (
            <View >
                <SliderModule height={300} ></SliderModule>
            </View>
        );
    }
}
/**
 * 商品信息
 */
class ProductInfo extends Component{
    render() {
        return (
            <Grid style={styles.sections}>
                <Row style={styles.sectionRows}>
                    <Text numberOfLines={2} style={styles.productName}>测试商品asd123</Text>
                </Row>
                <Row style={styles.sectionRows}>
                    <Text style={styles.productDesc} numberOfLines={2}>这是一些简单的描述</Text>
                </Row>
                <Row style={styles.sectionRows}>
                    <Text style={styles.price}>￥199</Text>
                </Row>
                <Row style={[styles.sectionRows,{marginBottom:0}]}>
                    <Left><Text style={styles.fontNormal}>快递：10</Text></Left>
                    <Body><Text style={styles.fontNormal}>月售100</Text></Body>
                    <Right><Text style={styles.fontNormal}>上海</Text></Right>
                </Row>
            </Grid>
        );
    }
}
/**
 * 商品属性
 */
class ProductParams extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'paramsVisible':false,
        }
    }
    _changeParamsVisible(){
        this.setState({
            'paramsVisible':!this.state.paramsVisible,
        })
    }
    render() {
        return (
            <View style={styles.sectionNoPadding}>
                <TouchableWithoutFeedback onPress={()=>this._changeParamsVisible()}>
                <Row style={[styles.listRows,{borderBottomColor:'#eee',borderBottomWidth:0.8}]}>
                    <Left >
                        <Text style={styles.fontNormal}>产品参数</Text>
                    </Left>
                    <Right><Text>....</Text></Right>
                </Row>
                </TouchableWithoutFeedback>
                <Row style={styles.listRows}>
                    <Left onPress={()=>this._changeParamsVisible()}>
                        <Text style={styles.fontNormal}>规格选择</Text>
                    </Left>
                    <Right><Text>....</Text></Right>
                </Row>
                <Modal 
                    animationType={'fade'} 
                    transparent={true} 
                    onShow={()=>{console.log('on show')}}
                    visible={this.state.paramsVisible} 
                    onRequestClose={() => {console.log('modal close')}}
                >
                    <TouchableWithoutFeedback onPress={()=>this._changeParamsVisible()}>
                    <View style={[styles.flex1,{backgroundColor:'rgba(0, 0, 0, 0.2)'}]}></View>  
                    </TouchableWithoutFeedback> 
                </Modal>
                <Modal 
                    animationType={'slide'} 
                    transparent={true} 
                    onShow={()=>{console.log('on show')}}
                    visible={this.state.paramsVisible} 
                    onRequestClose={() => {console.log('modal close')}}
                >
                    <View style={styles.flex1}>
                        <View style={styles.params}> 
                            <View style={[styles.modalTitle,styles.absoluteCenter]}>
                                <Text style={styles.modalTitleText}>产品参数</Text>
                            </View>
                            <View style={styles.modalBody}>
                                <Text>12312</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>this._changeParamsVisible()}>
                        <View style={[styles.modalFooter,styles.absoluteCenter]}>
                            <Text style={styles.modalFooterText}>完成</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    </View>   
                </Modal>
            </View>
        );
    }
}
/**
 * 评论
 */
class Comment extends Component{
    render() {
        return (
            <View style={styles.sections}>
                <View style={styles.commentItem}>
                    <Text style={styles.fontNormal}>评论（200）</Text>
                </View>
                <View style={styles.commentItem}>
                    <Text style={styles.commentBy}>WTF+</Text>
                    <Text style={styles.fontNormal}>测试评论++++++++++++++++++测试评论</Text>
                </View>
                <View style={styles.commentItem}>
                    <Text style={styles.commentBy}>WTF+</Text>
                    <Text style={styles.fontNormal}>测试评论++++++++++++++++++测试评论</Text>
                </View>
            </View>
        );
    }
}
/**
 * 商品详情
 */
class ProductDesc extends Component{
    render() {
        return (
            <View style={styles.sections}>
                <Text style={styles.fontNormal}>放一个webview?</Text>
            </View>
        );
    }
}

class Footer extends Component{
    render() {
        return (
            <View style={[styles.absoluteCenter,styles.footer]}>
                <Text style={styles.fontNormal}> ╮(╯▽╰)╭，没有了 </Text>
            </View>
        );
    }
}

class PayNav extends Comment{
    constructor(props) {
        super(props);
        this.state = {
            modalVisible : false,
            payCartNum:0,
        };
    }
    _addPayCart(){
        //防止多次点击
        if (this.state.modalVisible) return;
        var state = this.state;

        //TODO   判断是否可以加入
        //request
        
        //提示成功并2秒后关闭
        this.setState({
            modalVisible:true,
            payCartNum:state.payCartNum + 1,
        })
        this.timer = setTimeout(
            () => {
                this.setState({
                    modalVisible:false,
                })
            },
            2000
        );
        //this.timer && clearTimeout(this.timer);
    }
    componentWillUnMount() {
        //clear定时器
        this.timer && clearTimeout(this.timer);
    }
    render(){
        return(
            <View style={styles.PayNav}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={[styles.absoluteCenter,styles.PayNavIcon]}>
                        <Icon name="ios-heart-outline" size={25} color={themeColor} />
                    </View>
                    <View style={[styles.absoluteCenter,styles.PayNavIcon]}>
                        <View>
                            <Icon name="ios-cart-outline" size={25} color={themeColor} />
                            <View style={[styles.payCartNum,styles.absoluteCenter]}>
                                <Text style={{color:'#fff',fontSize:7}}>{this.state.payCartNum}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={()=>this._addPayCart()}>
                    <View  style={[styles.absoluteCenter,styles.payBtn]} >
                        <Text style={styles.payBtnText}>加入购物车</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Modal 
                    animationType={'fade'} 
                    transparent={true} 
                    onShow={()=>{console.log('on show')}}
                    visible={this.state.modalVisible} 
                    onRequestClose={() => {console.log('modal close')}}
                >
                    <View style={[styles.flex1,styles.absoluteCenter]}>
                        <View style={styles.innerContainer}> 
                            <View style={[styles.absoluteCenter,styles.modalItem]}>
                                <Icon name="ios-checkmark-circle-outline" size={25} color={'red'} />
                            </View>
                            <View style={[styles.absoluteCenter]}>
                                <Text style={{color:'#fff'}}>加入成功</Text>
                            </View>
                        </View>
                    </View>   
                </Modal>
            </View>
        )
    }
}

class Modals extends Comment{
    constructor(props) {
        super(props);
        this.state = {
            'paramsModalVisible':true,
        };
        
    }
    _closeParam(){
        this.setState({
            'paramsModalVisible':false,
        })
    }

    render(){
        return(
            <Modal 
                animationType={'slide'} 
                transparent={true} 
                onShow={()=>{console.log('on show')}}
                visible={this.state.paramsModalVisible} 
                onRequestClose={() => {console.log('modal close')}}
            >
                <View style={styles.paramsBox}>
                    <View style={styles.params}> 
                        <View style={[styles.modalTitle,styles.absoluteCenter]}>
                            <Text style={styles.modalTitleText}>产品参数</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <Text>12312</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>this._closeParam()}>
                    <View style={[styles.modalFooter,styles.absoluteCenter]}>
                        <Text style={styles.modalFooterText}>完成</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>   
            </Modal>
        );
    }
}

export default class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        
    }
    _goBack(){
        this.props.navigator.pop();
    }
   
    render() {
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor={themeColor} style={styles.headerStyle}>
                    <Left>
                        <Button transparent onPress={()=>this._goBack()}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title >{this.props.name}</Title>
                    </Body>
                </Header>
                <Content>
                    <SliderModule height={300} ></SliderModule>
                    <ProductInfo />
                    <ProductParams />
                    <Comment />
                    <ProductDesc />
                    <Footer />
                </Content>
                <PayNav section='底部nav'/>
                
            </Container>
        );
    }
}
