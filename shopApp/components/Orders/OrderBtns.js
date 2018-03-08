import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
//css
import {Commstyles,windowWidth,windowHeight} from '../../styles/comm.js';
import { changeOrderStatus } from './actions.js'

class OrdersBtns extends Component {  
    _onPress(id,type){
        let {changeOrder} =  this.props 
        changeOrder(id,type)
    } 
    render() {
        let {el,id} = this.props 
        return (
            <TouchableWithoutFeedback onPress={()=>this._onPress(id,el.type)}>
                <View style={[styles.opertBtn,{borderColor:el.color}]}>
                    <Text style={[{color:el.color},styles.btnText]}>
                        {el.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
    opertBtn:{
        width:70,
        height:25,
        borderRadius:6,
        alignItems:'center',
        justifyContent:"center",
        marginRight:6,
        borderColor:'gray',
        borderWidth:0.7,
    },
    btnText:{
        fontSize:13,
    },

})
const mapStateToProps = state => ({
  //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  changeOrder: (id,type) => dispatch(changeOrderStatus(id,type))
});

export default connect(mapStateToProps , mapDispatchToProps)(OrdersBtns);