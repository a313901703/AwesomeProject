/**
 * 主文件
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import UltimateListView from "react-native-ultimate-listview";
//css
import styles from '../../styles/comm';
//组件
import SliderModule from '../../common/slider';    //轮播
import Categories from './Categories';
import Advertiserments from './Advertiserments';
import Goods from './goods'
import Alert from '../Alert'

import {routers,signIn ,setProducts} from '../common/actions'
import { fetchProducts , requestProductsNew  } from './actions'


import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度
const themeColor = global.themeColor;

class MyList extends Component{
    static navigationOptions = {
        header: null,
    };

    _keyExtractor = (item, index) => item.id;

    _onPress(id){
        let navigation = this.props.navigation
        navigation.dispatch(routers('ProductDetail',{id}))
    }

    _renderItem (item, index, separator) {
        let {products} = this.props
        item = products.products[item]
        if (!item) {
            return (<View></View>);
        }
        return (
            <TouchableOpacity  onPress={()=>this._onPress(item.id)}>
            <View style={styles.goodsItem} >
                {
                    item.images && item.images.thumb ? 
                    <Image style={styles.goodsImg} source={{uri: item.images.thumb}}/> :
                    <Image style={styles.goodsImg} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/>
                }
                <Text numberOfLines={1} style={styles.goodsName}>{item.name}</Text>
                <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
                    <Text numberOfLines={1}>
                        <Text style={styles.price}>{item.price}  </Text>
                        <Text style={styles.marketPrice}>{item.market_price}</Text>
                    </Text>
                    <Text>
                        <Text style={styles.marketPrice}>{item.market_price}</Text>
                    </Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }

    onFetch =  async (page,startFetch, abortFetch) => {
        try {
            let {dispatch} = this.props
            let pageLimit = 10
            let response = await dispatch( fetchProducts(pageLimit) )
            startFetch(this.props.products.lists, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }
    };

    _ListHeaderComponent(){
        let {navigation,dispatch} = this.props;
        return(
            <View>
                <StatusBar translucent={true} barStyle="light-content" section='顶部状态栏'/>
                <SliderModule section='轮播' />
                <Categories section='分类图标' />
                <Advertiserments section='广告'/>
                <Goods section='各种商品' navigation={navigation} onClick={(item)=>this._onPress(item)}/>
                <View style={[styles.sectionHeader,{marginTop:10}]}>
                    <Image style={{width:'100%',height:'100%'}} source={require('../../imgs/title1.png')}/>
                </View>
                <Alert />
            </View>
        );
    }

    render(){
        let {products} = this.props
        return(
            <UltimateListView
                style={styles.container}
                header={()=>this._ListHeaderComponent()}
                keyExtractor={(item, index) => item}
                onFetch={this.onFetch}
                refreshableMode="advanced" //basic or advanced
                item={(item)=>this._renderItem(item)}
                numColumns={2}
                columnWrapperStyle={{backgroundColor:'#fff',justifyContent: 'space-between',padding:8}}
                refreshableTitleRelease={'下拉加载'}
                refreshableTitleRefreshing={'加载中'}
                refreshableTitlePull={'下拉加载'}
                displayDate={false}
                allLoadedText={'END  (￣△￣；)'}
            />
        );
    }
}
const mapStateToProps = state => ({
    products:state.products,
});
export default connect(mapStateToProps)(MyList);
