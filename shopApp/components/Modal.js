import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View,Modal } from 'react-native';
import { connect } from 'react-redux';
import {Commstyles,themeColor,windowWidth,windowHeight} from '../styles/comm';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Modals extends Component{
    static defaultProps = {
        visible: true,
        transparent:false,
        text:'success',
    };
    render(){
        return(
            <Modal 
                animationType={'fade'} 
                transparent={this.props.transparent} 
                onShow={()=>{console.log('on show')}}
                visible={this.props.visible} 
                onRequestClose={() => {console.log('modal close')}}
            >
                <View style={[styles.flex1,Commstyles.absoluteCenter]}>
                    <View style={styles.innerContainer}> 
                        <View style={[Commstyles.absoluteCenter,styles.modalItem]}>
                            <Icon name="ios-checkmark-circle-outline" size={25} color={themeColor} />
                        </View>
                        <View style={[styles.absoluteCenter]}>
                            <Text style={{color:'#fff'}}>{this.props.text}</Text>
                        </View>
                    </View>
                </View>   
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    flex1:{
        flex:1,
    },
    innerContainer:{
        borderRadius:10,
        paddingHorizontal:40,
        paddingVertical:15,
        opacity:0.6,
        backgroundColor:'#b0b0b0',
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