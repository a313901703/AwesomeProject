import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CommStyle from '../../styles/comm';
import {routers} from '../common/actions.js'
import { connect } from 'react-redux';
import { requestProductsNew } from './actions.js'



//推荐
class Recommend extends Component{
    _onPress(item){
        let {onClick} = this.props;
        onClick && onClick(item.id)
    }

    //初始化
    componentDidMount(){
        let navigation = this.props.navigation;
        navigation.dispatch(requestProductsNew())
    }
   
    _renderItem(item,i){
        let { products } = this.props
        item = products[item]
        return (
            <TouchableOpacity key={i} onPress={()=>this._onPress(item)}>
            <View style={CommStyle.RecommendGoodsItem} >
                {
                    item.images && item.images.thumb ? 
                    <Image style={CommStyle.RcommendGoodsImg} source={{uri: item.images.thumb}}/> :
                    <Image style={CommStyle.RcommendGoodsImg} source={{uri: 'http://ooafrn5be.bkt.clouddn.com/sanya1.jpg'}}/>
                }
                <View style={CommStyle.goodsInfo}>
                    <Text style={CommStyle.goodsName} numberOfLines={2}>{item.name}</Text>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <Text style={CommStyle.price}>￥{item.price} </Text>
                        <Text style={CommStyle.marketPrice}>￥{item.market_price}</Text>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    render(){
        let { recommends } = this.props
        return(
            <View style={CommStyle.sections} >
                <View style={[CommStyle.sectionHeader]}>
                    <Image style={{width:'100%',height:'100%'}} source={require('../../imgs/title2.png')}/>
                </View>
                <ScrollView style={{padding:8}} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    recommends.map((item,i)=>this._renderItem(item,i))
                }
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    recommends:state.products.recommends,
    products:state.products.products,
});
export default connect(mapStateToProps)(Recommend);


