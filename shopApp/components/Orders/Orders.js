import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SectionList,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
//css
import {Commstyles,windowWidth,windowHeight} from '../../styles/comm.js';
import OrderpRroductItem from './OrderProductItem.js'
import OrderBtns from './OrderBtns.js'
import UltimateListView from 'react-native-ultimate-listview'
import { fetchOrders,setStatus,cancel  } from './actions.js'
import Header from './Header.js'
import { Toast,Button } from 'antd-mobile';

class Orders extends Component {
    static navigationOptions = () => ({
        title: '我的订单',
    });
    //取消订单
    _cancel(id){
        let {navigation} = this.props
        navigation.dispatch( cancel(id) )
    }

    _renderSectionHeader(item){
        let statusText = {
            0:'等待付款',
            1:'等待发货',
            2:'卖家已发货',
            3:'等待订单确认',
            4:'订单已完成',
        }
        return (
            <View style={styles.itemHeader}>
                <View><Text style={styles.grayText}>{item.created_at}</Text></View>
                <View><Text style={styles.activeText}>{statusText[item.status] ? statusText[item.status] : ''}</Text></View>
            </View>
        );
    }

    _renderItem(item, index, separator){
        let { orders } = this.props
        let products = orders.products
        let currentStatus = orders.currentStatus
        if (currentStatus != 999 && item.status != currentStatus ) {
            return (<View></View>)
        }
        return (
            <View>
                {this._renderSectionHeader(item)}
                {
                    item.products.map(function(productid, index) {
                        return <TouchableWithoutFeedback key={productid}>
                            <View style={styles.orderItem} >
                                <Image style={styles.productImg} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName} numberOfLines={2}>{products[productid].name} </Text>
                                    <Text style={styles.productFormat} numberOfLines={2}>{products[productid].props}</Text>
                                </View>
                                <View style={styles.price}>
                                    <Text style={styles.sale_price}>￥{products[productid].price / 100} </Text>
                                    <Text style={styles.grayText}> ×{products[productid].nums} </Text>
                                </View>
                            </View></TouchableWithoutFeedback>;
                    })
                }
                {this._renderSectionFooter(item,products)}
            </View>
        )
    }

    _renderSectionFooter(section,products){
        let nums = 0
        let btns = [],
            btnItems = [];
        section.products.map(function(el, index) {
            nums += parseInt(products[el].nums)
        });
        if (section.status == 0) {
            btnItems.push(<Button type="ghost" key={section.id + Math.random()} inline size="small" style={{ marginRight: 4 }}>继续支付</Button>)
            btnItems.push(<Button key={section.id + Math.random()} size="small"
                 inline style={{ marginRight: 4 }} onClick={()=>this._cancel(section.id)}>取消订单</Button>)
        }else if(section.status == 2){
            
        }else if(section.status == 3){
            btnItems.push(<Button key={section.id + Math.random()} size="small" 
                type="ghost" inline style={{ marginRight: 4 }}>确认收货</Button>)
            // btnItems.push(<Button key={section.id + Math.random()} 
            //     type="ghost" disabled={true} inline style={{ marginRight: 4 }}>退货</Button>)
        }
        return (
            <View style={styles.sectionFooter}>
                <View style={styles.orderInfo}>
                    <Text style={styles.sectionFooterText}>共{nums}件商品,合计￥{section.total / 100} (含运费 ￥0.00)</Text>
                </View>
                <View style={[styles.orderOpertion]}>
                    {btnItems}
                </View>
            </View>
        );
    }

    onFetch =  async (page,startFetch, abortFetch) => {
        try {
            let {dispatch,orders} = this.props
            let pageLimit = 10
            Toast.loading('加载中');
            let response = await dispatch( fetchOrders() )
            startFetch(Object.values(this.props.orders.items), pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }
    };

    _changeStatus(status){
        let {dispatch,orders} = this.props;
        let _data = Object.values(orders.items)
        dispatch(setStatus(status))
        this.refs.UltimateListView.updateDataSource(_data)
        this.refs.UltimateListView.refresh()
    }

    _ListHeaderComponent(){
        let {dispatch,orders} = this.props;
        let currentStatus = orders.currentStatus
        return(
            <View>
                <Header status={currentStatus} dispatch={dispatch} changeStatus={(status)=>this._changeStatus(status)}/>
            </View>
        );
    }

    render() {
        return (
            <UltimateListView
                ref='UltimateListView'
                header={()=>this._ListHeaderComponent()}
                style={Commstyles.container}
                keyExtractor={(item, index) => item.id}
                onFetch={this.onFetch}
                refreshableMode="advanced" //basic or advanced
                item={(item)=>this._renderItem(item)}
                displayDate={false}
                refreshableTitleRelease={'加载中'}
                refreshableTitleRefreshing={'加载中'}
                refreshableTitlePull={'加载中'}
                allLoadedText={'END  (￣△￣；)'}
            />
        );
    }
}
const mapStateToProps = state => ({
    orders:state.orders,
});
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    orderItem:{
        backgroundColor:'#fdfdfd',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:5,
    },
    sectionFooterText:{
        fontSize:13,
    },
    sectionFooter:{
        marginBottom:4,
        backgroundColor:'#fff',
    },
    orderInfo:{
        height:30,
        justifyContent:'center',
        alignItems:"flex-end",
        borderBottomWidth:1,
        borderBottomColor:"#fbfbfb",
    },
    orderOpertion:{
        height:40,
        justifyContent:'flex-end',
        alignItems:"center",
        flexDirection:"row",
    },

    itemHeader:{
        height:30,
        paddingHorizontal:10,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"#fff",
    },
    productImg:{
        width:60,
        height:60,
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
        color:global.redColor,
        fontSize:13,
    },
    marketPrice:{
        color:'gray',
    },
    grayText:{
        color:'gray',
        fontSize:13,
    },
    opertBtn:{
        width:70,
        height:25,
        borderRadius:10,
        alignItems:'center',
        justifyContent:"center",
        marginRight:6,
        borderColor:'gray',
        borderWidth:0.7,
    },
    activeOpertBtn:{
        borderColor:global.orangeColor,
        borderWidth:0.7,
    },
    btnText:{
        fontSize:13,
    },
    activeText:{
        color:global.orangeColor,
        fontSize:13,
    },

})
export default connect(mapStateToProps)(Orders);