import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';

import OrderProductItem from '../Orders/OrderProductItem.js'

export class ProductList extends Component {
    render() {
        let { payCart} = this.props
        let items = Object.values(payCart.items)
        return (
            <View style={styles.container}>
                <View style={styles.products}>
                    {
                        items.map((el,index)=>{
                            return <OrderProductItem key={index} item={el}/>
                        })
                    }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor:'#fff',
        paddingTop:10,
    },
    rows:{
        paddingHorizontal:10,
    },
    row:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        height:40,
        borderBottomColor:'#fbfbfb',
        borderBottomWidth:1,
    },
    rowItem:{
        flex:1,
        justifyContent:'center',
    },
    rowTextRight:{
        textAlign:'right',
    },
    rowInput:{
        flex:1,
        justifyContent:'center',
    },
    inputLabel:{
        width:100,
        justifyContent:'center',
    },
    messageInput:{
        height: 39,
        fontSize:14
    },
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//         action: () => {
//             dispatch(actionAction());
//         },
//     };
// };

const mapStateToProps = state => ({
    payCart:state.payCart,
});

export default connect(mapStateToProps)(ProductList);
