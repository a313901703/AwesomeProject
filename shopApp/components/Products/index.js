import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  //Text,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import UltimateListView from "react-native-ultimate-listview";
//组件
import Icon from 'react-native-vector-icons/FontAwesome';
//css
import {Commstyles,windowWidth,windowHeight} from '../../styles/comm';
import {  ListItem, Text, Left , Right ,Thumbnail , Body } from 'native-base'
import { List, Radio } from 'antd-mobile';
import { routers } from '../common/actions.js'


const RadioItem = Radio.RadioItem;
const productMenuData = {
    'created_at':{'value':'created_at','label':'综合'},
    'updated_at':{'value':'updated_at','label':'新品'},
    'comment':{'value':'comment','label':'好评'},
}
class Products extends Component {
    // static navigationOptions = ({ navigation, screenProps }) => ({
    //     title: 'products',
    // });
    constructor(props){
        super(props);
        this.state = { 
            keyword: null,
            default:'created_at',
            price:null,
            sale_nums:null,
            sort:'desc',
            showMenu:false,
            endFetch:false,
            menuCheckd:0,
        };
    }
    _setSort(key){
        this._menuMask(false)
        if (key == 'price' || key == 'sale_nums') {
            this._setOtherSort(key)
        }else{
            this._setDefaultSort(key)
        }
    }
    _setDefaultSort(key){
        this.setState({
            default:key,
            menuCheckd:0,
        })
    }
    _setOtherSort(key){
        let _state = this.state[key]
        let nextState = null;
        if (!_state) {
            nextState = 'desc'
        }else if(_state == 'desc'){
            nextState = 'asc'
        }else{
            nextState = null
        }
        this.setState({
            key:nextState,
            menuCheckd:key == 'price' ? 2 : 1,
        })
    }

    _menuMask(visible){
        this.setState({
            showMenu:visible
        })
    }

    _menu(){
        let sorts = this.state.sort
        let _default = this.state.default
        let that = this
        return (
            <List>
                {
                    Object.values(productMenuData).map(function(el, index) {
                        return <RadioItem checked={ el.value == _default ? true : false } onChange={()=>that._setSort(el.value)} key={index}>
                            {el.label}
                        </RadioItem>;
                    })
                }
            </List>
        )
    }

    _ListHeaderComponent(){
        let showMenu = this.state.showMenu
        let _default = this.state.default
        let menuCheckd = this.state.menuCheckd
        return (
            <View>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={()=>this._menuMask(true)}>
                    <View style={[styles.headerItem,Commstyles.absoluteCenter]}>
                        <Text style={ menuCheckd == '0' ? {color:global.redColor} : {}} >{productMenuData[_default]['label']}</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.headerItem,Commstyles.absoluteCenter]}>
                        <Text style={ menuCheckd == '1' ? {color:global.redColor} : {}}>销量 <Icon name='sort' /></Text>
                    </View>
                    <View style={[styles.headerItem,Commstyles.absoluteCenter]}>
                        <Text style={ menuCheckd == '2' ? {color:global.redColor} : {}}>价格 <Icon name='sort' /></Text>
                    </View>
                    <View style={[styles.headerItem,Commstyles.absoluteCenter]}>
                        <Text style={ menuCheckd == '3' ? {color:global.redColor} : {}}><Icon name='list' /></Text>
                    </View>
                </View>
                { showMenu ? this._menu() : null }
                { showMenu ? 
                    <TouchableWithoutFeedback onPress={()=>this._menuMask(false)} >
                    <View style={styles.menuMask} /> 
                    </TouchableWithoutFeedback> : null}
            </View>
        )
    }

    onFetch =  async (page,startFetch, abortFetch) => {
        try {
            let {dispatch,products} = this.props
            let pageLimit = 10
            lists = products.lists
            startFetch(lists,10)
            // let response = await dispatch( fetchProducts(pageLimit) )
            //startFetch(this.props.products.lists, pageLimit);
        } catch (err) {
            abortFetch(); //manually stop the refresh or pagination if it encounters network error
            console.log(err);
        }
    };

    _productDetail(id){
        let navigation = this.props.navigation
        navigation.dispatch(routers('ProductDetail',{id}))
    }

    _renderItem (item, index, separator) {
        let { products } = this.props
        product = products.products[item]
        return (
            <View style={{backgroundColor:'#fff'}}>
            <ListItem thumbnail onPress={()=>this._productDetail(product['id'])}>
                <Left>
                    <Thumbnail square size={150} source={{uri:product['thumb'] ? product['thumb'] : global.defaultImg}} />
                </Left>
                <Body>
                    <Text>{product['name']}</Text>
                    <Text note style={{color:global.redColor,marginTop:5}}>{product['price']}￥</Text>
                </Body>
            </ListItem>
            </View>
        );
    }

    render(){
        return(
            <View style={[Commstyles.container]}>
            {this._ListHeaderComponent()}
            <UltimateListView
                keyExtractor={(item, index) => item}
                onFetch={this.onFetch}
                refreshableMode="advanced" //basic or advanced
                item={(item)=>this._renderItem(item)}
                refreshable={false}
                //refreshableTitleRelease={'正在加载'}
                //refreshableTitleRefreshing={'加载中'}
                //refreshableTitlePull={'正在加载'}
                displayDate={false}
                allLoadedText={'看完了  Σ（ﾟдﾟlll）'}
            />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    products:state.products,
});

const styles = StyleSheet.create({
    header:{
        height:40,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        borderBottomColor:'#fbfbfb',
        borderBottomWidth:0.8,
    },
    headerItem:{
        flex:1,
    },
    radioBox:{
        position:'absolute',
        top:40,
        left:0,
        backgroundColor:"#fff",
        zIndex:90,
        width:windowWidth,
    },
    menuMask:{
        width:windowWidth,
        height:windowHeight,
        backgroundColor:"#000",
        opacity:0.4,
        zIndex:89,
    },
    listItem:{
        width:windowWidth,
        backgroundColor:"#fff",
    },
})
export default connect(mapStateToProps)(Products);