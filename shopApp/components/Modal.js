import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View,Modal } from 'react-native';
import { connect } from 'react-redux';
import {Commstyles,themeColor,windowWidth,windowHeight} from '../styles/comm';
import Icon from 'react-native-vector-icons/Ionicons';
import {sweetAlert} from '../actions/index'

class Modals extends Component{
    _onShow(){
        dispatch = this.props.dispatch
        this.timer = setTimeout(
          () => dispatch(sweetAlert(false)),
          2000
        );
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
        this.props.dispatch(sweetAlert(false))
    }
    render(){
        let sweetAlert = this.props.sweetAlert
        return(
            <Modal 
                animationType={'fade'} 
                transparent={this.props.transparent} 
                onShow={()=>this._onShow()}
                visible={sweetAlert.visible} 
                //onRequestClose={() => {console.log('modal close')}}
            >
                <View style={[styles.flex1,Commstyles.absoluteCenter]}>
                    <View style={styles.innerContainer}> 
                        <View style={[Commstyles.absoluteCenter,styles.modalItem]}>
                            <Icon name="ios-checkmark-circle-outline" size={25} color={themeColor} />
                        </View>
                        <View style={[styles.absoluteCenter]}>
                            <Text style={{color:'#fff'}}>{sweetAlert.text}</Text>
                        </View>
                    </View>
                </View>   
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    sweetAlert:state.sweetAlert
});
const styles = StyleSheet.create({
    flex1:{
        flex:1,
    },
    innerContainer:{
        borderRadius:10,
        paddingHorizontal:40,
        paddingVertical:15,
        opacity:0.7,
        backgroundColor:'#666',
    },
    modalItem:{
        marginBottom:10,
    },

    content:{
        backgroundColor:'#fff',
        width:200,
        height:200,
    },
})

export default connect(mapStateToProps)(Modals);
