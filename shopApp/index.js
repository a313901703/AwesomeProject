/**
 * 主文件
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import UltimateListView from "react-native-ultimate-listview";
//css
import styles from './styles/comm';
//组件
import SliderModule from './common/slider';    //轮播
import Categories from './components/Home/Categories';
import Advertiserments from './components/Home/Advertiserments';
import Goods from './components/Home/goods'
//公共变量及方法
//import {requestGet,requestPost} from './common/request.js';
//import {config} from './common/config.js'; 

//import Detail from './detail.js';


import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度
const themeColor = '#33ccff';
var cacheResults = {
    nextPage:1,
    items:[],
    total:0,
};

var moreGoods = [
{'id':1,'name':'name_1'},{'id':2,'name':'name_2'},{'id':3,'name':'name_3'},{'id':4,'name':'name_4'}
];

class MyList extends Component{
    static navigationOptions = {
        header: null,
    };
    
    _keyExtractor = (item, index) => item.id;

    _renderItem = (item, index, separator) => (
        <View style={styles.goodsItem}>
            <Image style={styles.goodsImg} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/>
            <Text numberOfLines={1} style={styles.goodsName}>{item.name}</Text>
            <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
                <Text numberOfLines={1}>
                    <Text style={styles.price}>123  </Text>
                    <Text style={styles.marketPrice}>299</Text>
                </Text>
                <Text>
                    <Text style={styles.marketPrice}>299</Text>
                </Text>
            </View>
        </View>
    );

    sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

    onFetch =  async (page = 1, startFetch, abortFetch) => {
        try {
            //This is required to determinate whether the first loading list is all loaded.
            let pageLimit = 10;
            let skip = (page - 1) * pageLimit;
            //Generate dummy data
            let rowData = Array.from({length: pageLimit}, (value, index) => `item -> ${index + skip}`);
            //Simulate the end of the list if there is no more data returned from the server
            if (page === 10) {
                rowData = [];
            }
            //let rowData = moreGoods;
            //Simulate the network loading in ES7 syntax (async/await)
            await this.sleep(2000);
            startFetch(rowData, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }
    };

    _ListFooterComponent(){
        return(
            <View style={[styles.absoluteCenter,{backgroundColor:"#fff"}]}>
                 <Text>没有了(￣△￣；)</Text>
            </View>
        );
    }

    _ListHeaderComponent(){
        let {navigation} = this.props;
        return(
            <View>
                <StatusBar translucent={true} barStyle="light-content" section='顶部状态栏'/>
                <SliderModule section='轮播' />
                <Categories section='分类图标' />
                <Advertiserments section='广告'/>
                <View style={styles.sections}>
                <View style={styles.rows}>
                    <View >
                        <Image style={styles.advLeftImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv1.jpg'}}/>
                    </View>
                    <View >
                        <Image style={styles.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv2.jpg'}}/>
                        <Image style={styles.advRightImg} source={{uri:'http://ooafrn5be.bkt.clouddn.com/adv3.jpg'}}/>
                    </View>
                </View>
            </View>
                <Goods section='各种商品' navigation={navigation}/>
                <View style={[styles.sectionHeader,{marginTop:10}]}>
                    <Text style={styles.sectionHeaderText}>title3</Text>
                </View>
            </View>
        );
    }

    _customRefreshView(){
        return (
            <View style={[styles.absoluteCenter,{height:80,backgroundColor:'red'}]}>
            </View>
        );
    }

    render(){
        return(
            <UltimateListView
                style={styles.container}
                header={()=>this._ListHeaderComponent()}
                keyExtractor={(item, index) => Math.random() + {index}}
                //keyExtractor={this._keyExtractor}
                onFetch={this.onFetch}
                refreshableMode="advanced" //basic or advanced
                item={this._renderItem}
                numColumns={2}
                columnWrapperStyle={{backgroundColor:'#fff',justifyContent: 'space-between',padding:8}}
                refreshableTitleRelease={'下拉加载'}
                refreshableTitleRefreshing={'加载中'}
                refreshableTitlePull={'下拉加载'}
                //displayDate={false}
                allLoadedText={'END  (￣△￣；)'}
                //spinnerColor={'#fff'}
                //autoPagination={true}
                //waitingSpinnerText={'loading'}
                //customRefreshView={this._customRefreshView}
                //arrowImage={'http://facebook.github.io/react/img/logo_og.png'}
                //separator={false}
            />
        );
    }
}

export default MyList
