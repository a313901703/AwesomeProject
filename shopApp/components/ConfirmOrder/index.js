import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import {Commstyles,windowWidth} from '../../styles/comm.js';
import themeStyle from '../../styles/theme';
import Address from './Address.js'
import ProductList from './ProductList.js'
import Total from '../PayCart/Total.js'
//import { GiftedForm,GiftedFormManager } from 'react-native-gifted-form'
import { routers,goBack } from '../common/actions.js'
import { ListItemStyle } from '../../styles/theme.js'
import { List, InputItem,Toast,WhiteSpace,Modal,Radio } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createOrder } from './actions'

const RadioItem = Radio.RadioItem;
const Item = List.Item;

const mapStateToProps = ( state ) => ({
    address: state.address.items,
    _defaultAddress:state.address.default,
    payCart:state.payCart,
});

export class ConfirmOrder extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '确认订单',
    });
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            checked:0,
            message:'',
            address:0,
        };
    }
    _submit(){
        let {navigation,address,_defaultAddress} = this.props 
        let values = {}
        values.message = this.state.message
        values.pay_type = this.state.checked
        values.address_id = this.state.address ? this.state.address : _defaultAddress
        //values.address = address.length > 0 ? address[0]['id'] : _defaultAddress
        if (this._validateValues(values)) {
            navigation.dispatch( createOrder(values) )
        }    
    }
    _validateValues(values){
        let error = ''
        if (!values.address_id) {
            error = '请选择收货地址'
        }
        if (error) {
            Toast.fail(error,2)
            return false
        }
        return true
    }

    _changePayType(value){
        this.setState({
            checked:value,
            visible:false,
        })
    }
    _toggleModal(){
        let visible = this.state.visible
        this.setState({
            visible:!visible
        })
    }
    _handCallBack(id){
        if (id) {
            this.setState({
                address:id
            })
        }
    }
    render() {
        let rightInputStyle = themeStyle
        rightInputStyle['input'] = rightInputStyle['rightInput']
        const data = [
          { value: 0, label: '支付宝', thumb : 'http://ooafrn5be.bkt.clouddn.com/alipay.png'},
          { value: 1, label: '微信支付', thumb : 'http://ooafrn5be.bkt.clouddn.com/wechart-pay.png' },
        ];
        let _this = this
        let { address,_defaultAddress,payCart } = this.props
        let addressid = this.state.address ? this.state.address : _defaultAddress
        return (
            <View style={Commstyles.container}>
                <Address handCallBack={(id)=>this._handCallBack(id)} addressid={addressid} />
                <ProductList />
                <List>
                    <Modal
                        popup
                        visible={this.state.visible}
                        animationType="slide-up"
                        maskClosable={true}
                        onClose={()=>{this.setState({visible:false})}}
                    >
                        <List renderHeader={() => '选择支付方式'}>
                            {
                                data.map(function(el, index) {
                                    return <Item key={el.value} 
                                    onClick={()=>_this._changePayType(el.value)}
                                    extra={<Icon name='check-circle-o' size={17} color={el.value == _this.state.checked ? global.greenColor : 'gray'}/>}
                                    arrow='empty'
                                    thumb={el.thumb}
                                    >{el.label}</Item>;
                                })
                            }
                            <View style={{height:100,width:windowWidth}}></View>
                        </List>
                    </Modal>
                    <InputItem
                        value="6"
                        extra="¥"
                        styles={StyleSheet.create(rightInputStyle)}
                    >运费</InputItem>
                    <InputItem
                        placeholder="买家留言"
                        styles={StyleSheet.create(themeStyle)}
                        onChange={(value)=>this.setState({message:value})}
                    >留言</InputItem>
                    <View style={{width:windowWidth,height:10,backgroundColor: '#fbfbfb'}}></View>
                    <Item extra={data[this.state.checked] ? data[this.state.checked]['label'] : ''} 
                        arrow="horizontal" 
                        styles={StyleSheet.create(ListItemStyle)}
                        onClick={()=>this._toggleModal()}>支付方式</Item>
                </List>
                <Total count={payCart.count.nums} price={payCart.count.price} text={'提交订单'} onClick={()=>this._submit()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

})
export default connect(
    mapStateToProps
)(ConfirmOrder);
