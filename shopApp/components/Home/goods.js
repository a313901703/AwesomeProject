import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CommStyle from '../../styles/comm';
import {routers} from '../../actions/index'
import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度


var goods = [
    ['recommend1','recommend2','recommend3','recommend4'],
    ['new1', 'new2', 'new 3'],
    ['more1','more2','more3','more4',]
];


//更多商品
class GoodsMore extends Component{
     _renderRow(data){
        return (
            <View style={CommStyle.goodsItem}>
                <Thumbnail style={CommStyle.goodsImg} square  source={{uri:'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}} />
                <View style={CommStyle.goodsInfo}>
                    <Text style={CommStyle.goodsName} numberOfLines={1}>测试标题</Text>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <Text style={CommStyle.price}>￥200  </Text>
                        <Text style={CommStyle.marketPrice}>￥300</Text>
                        <Text style={CommStyle.nums} >已售100</Text>
                    </View>
                </View>
            </View>
        );
    }
    render(){
        return(
            <View style={CommStyle.sections} >
                <View style={CommStyle.sectionHeader}>
                    <Text style={CommStyle.sectionHeaderText}>{'更多'}</Text>
                </View>
                <ListView
                    contentContainerStyle={CommStyle.goodsList}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderFooter={this._renderFooter.bind(this)}
                    // onEndReached={this._fetchMoreData.bind(this)}
                    // onEndReachedThreshold={20}
                    // automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
}

//推荐
class Recommend extends Component{
    _onPress(id){
        let navigation = this.props.navigation;
        navigation.dispatch(routers('ProductDetail',{id:1}))
    }
    render(){
        return(
            <View style={CommStyle.sections} >
                <View style={CommStyle.sectionHeader}>
                    <Text style={CommStyle.sectionHeaderText}>title1</Text>
                </View>
                <ScrollView style={{padding:8}} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    this.props.goods.map((item,i)=>{
                        return (
                            <TouchableOpacity key={i} onPress={()=>this._onPress(1)}>
                            <View style={CommStyle.RecommendGoodsItem} >
                                <Image style={CommStyle.RcommendGoodsImg} square source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}} />
                                <View style={CommStyle.goodsInfo}>
                                    <Text style={CommStyle.goodsName} numberOfLines={1}>productName</Text>
                                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                                        <Text style={CommStyle.price}>￥300  </Text>
                                        <Text style={CommStyle.marketPrice}>￥99</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )
                    })
                }
                </ScrollView>
            </View>
        );
    }
}
//新品
class News extends Component{
    render(){
        return(
            <View style={CommStyle.sections} >
                <View style={CommStyle.sectionHeader}>
                    <Text style={CommStyle.sectionHeaderText}>title2</Text>
                </View>
                <ScrollView style={{padding:8}} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    this.props.goods.map((item,i)=>{
                        return (
                            <View style={[CommStyle.newsGoodsItem]} key={i}>
                                <ImageBackground style={CommStyle.newsGoodsImage}  source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}>
                                    <Text style={CommStyle.newsInfo}>
                                        <Text style={CommStyle.newsInfoItem}>测试新品广告</Text>{'\n'}
                                        <Text style={CommStyle.newsInfoItem}>测试新品广告描述</Text>
                                    </Text>
                                </ImageBackground>
                            </View>
                        )
                    })
                }
                </ScrollView>
            </View>
        );
    }
}
//商品列表
export default class Goods extends Component{
    render(){
        let navigation = this.props.navigation;
        return(
            <View >
                <Recommend goods={goods[0]} 
                    navigation={navigation}
                    />
                <View style={CommStyle.sections} >
                    <Image style={CommStyle.advRow} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/slider1.jpg'}} />
                </View>
                <News goods={goods[1]}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});
