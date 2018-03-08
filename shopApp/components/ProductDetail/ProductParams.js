import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;     //屏幕宽度
const windowHeight = Dimensions.get('window').heignt;
import { List,Button,Modal } from 'antd-mobile';
import { SListItemStyle } from '../../styles/theme.js'

const Item = List.Item
export default class ProductParams extends Component{

    _onClick(){
        let {handClick} = this.props
        handClick && handClick();
    }

    render(){
        let {visible} = this.props
        let data = [{'key':'保质期','value':'12个月'},{'key':'保质期','value':'12个月'},{'key':'保质期','value':'12个月'},{'key':'保质期','value':'12个月'},{'key':'保质期','value':'12个月'}];

        return(
            <Modal
                popup 
                visible={visible}
                animationType="slide-up"
                maskClosable={true}
                onClose={()=>this._onClick()}
            >
                <List renderHeader={<View style={styles.header}><Text style={styles.title}>产品参数</Text></View>}>
                <ScrollView style={styles.body}>
                {
                    data.map(function(item, index) {
                        return <Item wrap key={index} styles={StyleSheet.create(SListItemStyle)}><Text>
                            <Text  style={styles.rowsKeyText}>{item.key}    </Text>
                            <Text  style={styles.rowsValueText}>{item.value}</Text></Text>
                            </Item>;
                    })
                }
                </ScrollView>
                <TouchableWithoutFeedback onPress={()=>this._onClick()}>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>确认</Text>
                </View>
                </TouchableWithoutFeedback>
                </List>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    contains:{
        flex:1,
    },
    header:{
        height:40,
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:16,
    },
    body:{
        height:windowHeight/2,
        paddingBottom:40,
    },
    rows:{
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:8,
    },
    rowsKey:{
        width:70,
    },
    rowsKeyText:{
        color:'gray',
    },
    rowsValue:{
        flex:1,
        paddingLeft:10,
    },
    footer:{
        height:40,
        width:windowWidth,
        position:'absolute',
        bottom:0,
        left:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
    },
    footerText:{
        color:"#fff",
    },
    line:{
        borderTopColor:'#f2f2f2',
        borderTopWidth:1,
    },
});

// const mapStateToProps = state => ({
//     params:state.formats.params,
// });
//export default connect(mapStateToProps)(ProductParams);
