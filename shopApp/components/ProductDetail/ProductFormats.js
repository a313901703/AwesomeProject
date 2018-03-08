import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

//import Modal from 'react-native-simple-modal';
import {chooseFormat,changeNums,addToCart} from './actions.js'
import { windowWidth,windowHeight,themeColor,Commstyles } from '../../styles/comm.js'
import { Modal,Toast } from 'antd-mobile';


class ProductFormats extends Component{
    _changeNums(type){
        let {dispatch} = this.props;
        dispatch(changeNums(type))
    }

    _addToCart(id){
        let that = this
        let {dispatch} = this.props;
        dispatch(addToCart(id))
        .then((response)=>{
            if (response.payload) {
                Toast.success('添加成功，在购物车等你呦 ^_^',2);
                that._onClose()
            }
        }).catch((error) => {
            //console.log('加入购物车错误')
        })
    }

    _onClose(){
        let {handClose} = this.props
        handClose && handClose();
    }

    _choose(id,pid,name){
        let {dispatch,productinfo} = this.props;
        dispatch(chooseFormat(productinfo.id,{[pid]:id},{[pid]:name}))
    }

    _formats(item,i){
        return(
            <View style={styles.rows} key={item.id}>
                <View style={styles.rowsTitle}><Text>{item.name}</Text></View>
                <View style={styles.rowsValues}>
                    {
                        item.propsvalues.map((item,i) => this._renderItem(item,i))
                    }   
                </View>
            </View>
        )
    }
    _renderItem(item,i){
        let choose = this.props.choose.choose
        let checkedid = item.props_id in choose ? choose[item.props_id] : 0;
        return (
            <TouchableWithoutFeedback key={item.id} onPress={()=>this._choose(item.id,item.props_id,item.name)}>
            <View style={[styles.items,checkedid == item.id && styles.selectItems]} >
                <Text style={[styles.formats,checkedid == item.id && styles.selectFormats]}>{item.name}</Text>
            </View>
            </TouchableWithoutFeedback>
        );
    }

    render(){
        let {productinfo,choose,visible} = this.props
        let _props = productinfo.props ? productinfo.props : []

        return(
            <Modal
                popup 
                visible={visible}
                animationType="slide-up"
                maskClosable={true}
                onClose={()=>this._onClose()}
            >
                <View style={styles.contains}>
                    <Image style={styles.thumb} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/>
                    <View style={styles.header}>
                        <View style={styles.thumbBox}>
                        </View>
                        <View style={styles.formatInfo}>
                            <Text style={{color:'#ff0033'}}>￥{productinfo.price}</Text>
                            <Text>库存{productinfo.stock}</Text>
                            <Text>选择
                                {
                                    _props.map((item,i)=>'  ' + item.name)
                                }
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={styles.body}>
                        {
                            _props.map((item,i)=>this._formats(item,i))
                        }       
                        <View style={[styles.rows,styles.nums]}>
                            <TouchableWithoutFeedback onPress={()=>this._changeNums('substact')}>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNumMinus]}>
                                <Text>-</Text>
                            </View>
                            </TouchableWithoutFeedback>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNums]}>
                                <Text>{choose.nums}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={()=>this._changeNums('add')}>
                            <View style={[Commstyles.absoluteCenter,styles.priceNumBox,styles.priceNumAdd]}>
                                <Text>+</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                    <TouchableWithoutFeedback onPress={()=>this._addToCart(productinfo.id)}>
                    <View style={[styles.footer,Commstyles.absoluteCenter]}>
                        <Text style={styles.footerText}>加入购物车</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    choose:state.chooseFormat,
    formats:state.formats,
});


const styles = StyleSheet.create({
    contains:{
        flex:1,
        padding:10,
        paddingTop:20,
        height:windowHeight/3 * 2,
    },
    header:{
        flexDirection: 'row',
        paddingBottom:10,
        height:70,
        borderBottomColor:'#dbdbdb',
        borderBottomWidth:0.5,
    },
    thumbBox:{
        marginRight:10,
        width:100,
    },
    thumb:{
        width:100,
        height:100,
        position:'absolute',
        top:-20,
        left:10,
    },
    body:{
        flex:1,
    },
    rowsTitle:{
        marginBottom:8,
    },
    rows:{
        borderBottomColor:"#dbdbdb",
        borderBottomWidth:0.5,
        paddingVertical:10,
    },
    rowsValues:{
        flexDirection: 'row',
    },
    items:{
        borderRadius:20,
        backgroundColor:"#ebebeb",
        padding:12,
        paddingVertical:6,
        marginRight:10,
    },
    selectItems:{
        backgroundColor:global.redColor,
    },
    formats:{
        fontSize:12,
    },
    selectFormats:{
        color:'#fff',
    },
    nums:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'flex-end',

    },
    priceNumBox:{
        borderWidth:1,
        borderColor:'#f5f5f5',
        width:30,
        height:30,
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
    footer:{
        width:windowWidth,
        height:50,
        position:"absolute",
        bottom:0,
        left:0,
        backgroundColor:global.redColor,
    },
    footerText:{
        fontSize:16,
        color:'#fff',
    }
});


export default connect(mapStateToProps)(ProductFormats);
