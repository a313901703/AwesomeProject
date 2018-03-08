import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Commstyles,windowWidth,windowHeight} from '../../styles/comm.js';
import EmptyAddress from './EmptyAddress.js'
import { fetchAddress } from '../Address/action.js'
import { routers } from '../common/actions.js'  

export class Address extends Component {
    componentDidMount() {
        let {addresses,fetchAddress} = this.props
        if (Object.values(addresses).length <= 0) {
            fetchAddress()
        }
    }
    //默认地址
    _addresses(address){
        return(
            <View style={styles.addressBox}>
                <View style={[styles.addressRows,styles.userInfo]}>
                    <View><Text>收货人：{address.name}</Text></View>
                    <View><Text style={styles.addrPhoneNum}>{address.phone}</Text></View>
                </View>
                <View style={styles.addressRows}>
                    <View style={[styles.addrIcon]}>
                        <Icon name="map-marker" size={20} color='#777' />
                    </View>
                    <View style={styles.addressInfo}>
                        <Text style={styles.addrtext} numberOfLines={2}>收货地址:  {address.district}{address.detailed_address}</Text>
                    </View>
                    <View style={[styles.addrMore]}>
                        <Icon name="angle-right" size={20} color='#777' />
                    </View>
                </View>
            </View>
        );
    }
    _onPress(){
        let { handCallBack,router } = this.props
        router({handCallBack:handCallBack})
    }

    render() {
        //分割线  （不会Ps (╯‵□′)╯︵┻━┻）
        let lineItems = []
        for (var i = 0; i < 9; i++) {
            lineItems.push(
                <View style={[styles.lineItem,(i%2) && styles.lineItemRed]} key={i}></View>
            )
        }
        let { addresses,router,addressid} = this.props
        let _address = null
        if (addressid) {
            _address = addresses[addressid]
        }
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={(address)=>this._onPress()}>
                <View style={[styles.address]}>
                    {
                        _address ? this._addresses(_address) : 
                        <EmptyAddress />
                    }
                </View>
                </TouchableWithoutFeedback>
                <View style={[Commstyles.positionBottom,styles.line]}>
                {
                    lineItems.map((el,index)=>{
                        return el
                    })
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    address:{
        backgroundColor:'#fff',
        height:90,
        paddingTop:10,
    },
    addressBox:{
        flex:1,
    },
    
    userInfo:{
        paddingLeft:30,
        paddingRight:20,
        justifyContent:'space-between',
        marginBottom:10,
    },
    addressRows:{
        flexDirection: 'row',
    },
    addrIcon:{
        width:30,
        alignItems:'center',
    },
    addressInfo:{
        flex:1,
    },
    addrMore:{
        width:20,
        alignItems:'center',
        //height:'100%',
    },
    addrPhoneNum:{
        fontWeight:'300',
    },
    addrtext:{
        fontSize:13,
        lineHeight:16,
    },

    line:{
        flexDirection: 'row',
        width:windowWidth,
        left:-(windowWidth/24),
    },
    lineItem:{
        width:windowWidth/12,
        height:7,
        transform:[{skewX:'30deg'}],
        backgroundColor:global.themeColor,
        marginRight:windowWidth/24,
    },
    lineItemRed:{
        backgroundColor:global.redColor,
    },
})

const mapStateToProps = state => ({
    addresses: state.address.items,
});
const mapDispatchToProps = dispatch => ({
    fetchAddress: ()=> dispatch( fetchAddress() ),
    router: (params) => dispatch( routers('Address',params) ),
});

export default connect(mapStateToProps,mapDispatchToProps)(Address);

