import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SectionList,
  TouchableHighlight,
} from 'react-native';
// import {
//     * as actions,
// } from './action.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Commstyles,windowWidth} from '../../styles/comm';
import { routers } from '../common/actions.js'
import { setDefault,fetchAddress } from './action.js'
import { Toast } from 'antd-mobile';


export class Address extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '我的地址',
    });

    componentDidMount() {
        let {address,fetchAddress} = this.props
        Toast.loading('加载中',0)
        fetchAddress()
    }
    //设置为默认
    _setDefault(id){
        let {setDefault} = this.props
        setDefault(id)
    }
    //点击单个地址事件
    _addressOnPress(id){
        let { navigation } = this.props
        if (navigation &&  navigation.state.params.handCallBack) {
            let handCallBack = navigation.state.params.handCallBack
            handCallBack && handCallBack(id)
            navigation.goBack()
        }
    }
    _address(item,i){
        return  <View style={styles.addritem} key={i}>
                    <TouchableHighlight onPress={()=>this._addressOnPress(item.id)}>
                    <View style={styles.itemBody}>
                        <View style={styles.row}>
                            <Text style={[styles.itemText,Commstyles.fontNormal]}>{item.name}</Text>
                            <Text style={styles.itemText,Commstyles.fontNormal}>{item.phone}</Text>
                        </View>
                        <View style={Commstyles.space}></View>
                        <View style={[styles.row]}>
                            <View><Text style={styles.itemText,Commstyles.fontNormal}>
                                {item.district}{item.detailed_address}
                            </Text></View>
                        </View>
                    </View>
                    </TouchableHighlight>
                    <View style={Commstyles.cutoffLine}></View>
                    <View style={styles.itemFooter}>
                        <View style={[styles.row]}>
                            <View style={styles.rowItem}>
                                <TouchableWithoutFeedback onPress={()=>this._setDefault(item.id)}>
                                <View>
                                    <Text style={styles.itemText,Commstyles.fontNormal}>
                                        {
                                            item.default == '0' ? <Text><Icon name='circle-o' size={15} /> 设为默认</Text> : <Text><Icon name='check-circle-o' size={15} color={global.themeColor}/> 设为默认</Text>
                                        }
                                     </Text>
                                 </View>
                                 </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.itemText,Commstyles.fontNormal}>
                                    <Text><Icon name="pencil-square-o" size={15} /> 编辑  </Text>
                                    <Text><Icon name="trash-o" size={15} /> 删除</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
    }
    render() {
        let {address,addAddress,navigation} = this.props
        address = Object.values(address)
        address.sort(function(a,b){
            return b['default'] - a['default']
        })
        return (
            <View style={Commstyles.container}>
                <View>
                {
                    address.map((item,i)=>this._address(item,i))
                }
                </View>
                <TouchableWithoutFeedback onPress={addAddress}>
                <View style={[styles.addAddress,Commstyles.absoluteCenter,Commstyles.positionBottom]}>
                    <Text style={styles.addAddressText}>
                    <Icon name='plus-circle' size={20}/>  添加收货地址
                    </Text>
                </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addritem:{
        backgroundColor:'#fff',
        marginBottom:10,
    },
    itemBody:{
        padding:10,
    },
    itemFooter:{
        padding:10,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    space:{
        width:windowWidth,
        height:10,
    },
    addAddress:{
        height:50,
        width:windowWidth,
        backgroundColor:global.themeColor,
    },
    addAddressText:{
        color:"#fff",
        fontSize:20,
    },
})

const mapStateToProps = state => ({
    address:state.address.items,
    default:state.address.default,
});

const mapDispatchToProps = dispatch => ({
    addAddress: () => dispatch(routers('AddAddress')),
    setDefault: (id) => dispatch( setDefault(id) ),
    fetchAddress: ()=> dispatch( fetchAddress() ),
});
export default connect(mapStateToProps,mapDispatchToProps)(Address);
