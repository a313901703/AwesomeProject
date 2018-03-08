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
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
//组件
import Swipeout from 'react-native-swipeout';
import ProductItem from './ProductItem.js'
import Total from './Total.js'
import NotLogin from '../NotLogin.js'
import {Commstyles,windowWidth} from '../../styles/comm';
import {fetchPayCart , changeNums , itemDelete} from './actions'
import { routers } from '../common/actions.js'

class Paycart extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '购物车',
    });

    constructor(props){
        super(props);
    }

     //初始化
    componentDidMount(){
        let {navigation,dispatch,user} = this.props;
        if (user && user.auth_key) {
            navigation.dispatch(fetchPayCart())
        }
    }

    componentWillReceiveProps(nextProps) {
        let {navigation,dispatch,user} = this.props; 
        if (this.props.user != nextProps.user) {
            navigation.dispatch(fetchPayCart())
        }
    }

    _changeNums(type,id){
        let {navigation} = this.props;
        navigation.dispatch( changeNums(type,id) )
    }
 
    _itemDelete(id){
        let {navigation} = this.props;
        navigation.dispatch( itemDelete(id) )
    }
    _renderItem = ({item}) => (
        <Swipeout right={[{
                    text: '删除',
                    color:'#fff',
                    onPress:()=>this._itemDelete( item.id ),
                    underlayColor:'#ff0033',
                    type:'delete'
                }]} backgroundColor={'#fff'}>
            <View style={styles.section} >
                <ProductItem item={item} onChangeNums={(type,id)=>this._changeNums(type,id)}/>
            </View>
        </Swipeout>
    )

    //结算
    _settlement(){
        let {navigation} = this.props;
        navigation.dispatch( routers('ConfirmOrder') )
    }

    _ItemSeparatorComponent=()=>(
        <View style={styles.itemLine}></View>
    )
    _keyExtractor = (item, index) => item.id;
    render() {
        let {payCart,user,navigation} = this.props
        let items = Object.values(payCart.items)
        if (!user || !user.auth_key) {
            return (
                <View style={Commstyles.container}>
                    <NotLogin navigation={navigation}/>
                </View>
            );
        }
        return(
            <View style={Commstyles.container}>
                <FlatList 
                    style={Commstyles.container}
                    data={items}
                    keyExtractor = {this._keyExtractor}// 每个item的key
                    renderItem = {this._renderItem}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                />
                {
                    payCart.count.price ? 
                    <Total count={payCart.count.nums} price={payCart.count.price} onClick={()=>this._settlement()}/> :
                    <View></View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    payCart:state.payCart,
    user:state.user,
});

const styles = StyleSheet.create({
    section:{
        padding:5,
        backgroundColor:'#fff',
        height:80,
    },
    itemLine:{
        height:3,
    },  
    count:{
        backgroundColor:"#fff",
        width:windowWidth,
        height:40,
        flexDirection: 'row',
        position:'absolute',
        left:0,
        bottom:0,
    },
    countItem:{
        flex:1,
        justifyContent:'center',
        paddingLeft:10,
    },
    settle:{
        backgroundColor:global.redColor,
        width:100,
        height:'100%',
    },

});
export default connect(mapStateToProps)(Paycart);
