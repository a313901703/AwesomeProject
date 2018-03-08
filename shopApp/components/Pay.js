import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import {Commstyles} from '../styles/comm';

class Pay extends Component {
    componentDidMount() {
        Toast.loading('正在发起支付,虽然还不能支付',2)
    }
    render() {
        return (
            <View style={Commstyles.container}>

            </View>
        );
    }
}
const mapStateToProps = state => ({
    //isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    pay: () => dispatch({ type: 'pay' }),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pay);
