
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import ListItem from '../ListItem';
import { ListItemStyle } from '../../styles/theme.js'
import { List,Toast,ActivityIndicator } from 'antd-mobile';

const Item = List.Item;

class Formats extends Component{
    _showParams(){
        this.props.changeProductParams({params:true,formats:false});
    }

    _showFormats(){
        this.props.changeProductParams({params:false,formats:true});
    }
    render(){
        let {choose,product} = this.props
        var data = []
        data[0] = {'name':'产品参数'}
        //console.log(productInfo)
        data[1] = {'name':'选择规格'}
        let names = Object.values(choose.names)
        if (names && names[0]) {
            let name = names.map(function(item) {
                return item + ' ';
            })
            name = '已选: ' + name
            data[1] = { name : name}
        }
        if (productInfo && productInfo.props &&  productInfo.props.length<= 0 ) {
            delete data[1]
        }

        return(
            <Item arrow='horizontal' onClick={()=>this._onPress(v.router)} styles={StyleSheet.create(ListItemStyle)} key={_key} >
              {item.name}
            </Item>
        );
        return(
            <View style={{marginBottom:10,backgroundColor:'#fff'}}>
                {
                    data.map((item,i)=>{
                        let _func = i == 0 ? ()=>this._showParams() : ()=>this._showFormats()
                        return (
                            <ListItem item={item} key={i} onclick={_func}/>
                        )
                    })
                }
            </View>
        );
    }
}
export default Formats;