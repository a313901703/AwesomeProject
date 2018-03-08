import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

export default class EmptyPage extends Component{
    render(){
        return (
            <View></View>
        )
    }
}