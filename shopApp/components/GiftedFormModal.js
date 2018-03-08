import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { GiftedForm } from 'react-native-gifted-form'

export default class GiftedFormModal extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.title,
    });
    render(){
        const { renderContent } = this.props.navigation.state.params || {};
        return (
            <View style={{flex:1}}>
                {renderContent()}
            </View>
        )
    }
}