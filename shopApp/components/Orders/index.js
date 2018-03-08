import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    SectionList,
} from 'react-native';
import { connect } from 'react-redux';
//组件
import Icon from 'react-native-vector-icons/FontAwesome';
//css
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';
import Header from './Header.js'

import OrdersEmpty from './OrdersEmpty.js'
import MyOrders from './Orders.js'
import { fetchOrders ,setStatus } from './actions.js'
import { routers } from '../common/actions.js'

class Orders extends Component {
    static navigationOptions = () => ({
        title: '我的订单',
    });

    constructor(props){
        super(props)
        this._changeStatus = this._changeStatus.bind(this)
        this.state = {
            currentStatus : 0 ,
        }
    }

     //初始化
    componentDidMount(){
        let {navigation} = this.props;
        let status = navigation.state.params.status
        //this._changeStatus(status)
    }


    _changeStatus(status){
        let {dispatch} = this.props;
        dispatch(setStatus(status))
        dispatch(fetchOrders('refresh'))
    }

    render() {
        let {orders,dispatch} = this.props
        let currentStatus = orders.currentStatus
        //orders = orders.items
        return (
            <View style={Commstyles.container}>
                <Header status={currentStatus} dispatch={dispatch} changeStatus={(status)=>this._changeStatus(status)}/>
                <MyOrders dispatch={dispatch}/>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    orders:state.orders,
    //status:state.orders.status,
});
const styles = StyleSheet.create({
    
})
export default connect(mapStateToProps)(Orders);