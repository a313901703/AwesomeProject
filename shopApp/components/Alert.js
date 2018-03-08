import React, { Component } from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-simple-modal';

import { alertInit,ALERT_WORING,ALERT_SUCCESS,ALERT_ERROR} from './common/actions'
import {Commstyles,themeColor,windowWidth,windowHeight} from '../styles/comm';

class Alert extends Component{
    _onShow(){
        dispatch = this.props.dispatch
        let that = this
        this.timer = setTimeout(
            () => that._close(),
          2000
        );
    }

    _close(){
        const {onClose,dispatch} = this.props;
        dispatch(alertInit())
        onClose && dispatch(onClose());
    }
    // componentWillMount(){
    //     dispatch = this.props.dispatch
    //     console.log(12312)
    //     dispatch(alertInit())
    // }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
        this._close()
    }

    render(){
        let alert = this.props.alert
        if (alert.type == ALERT_WORING) {
            var icon = require('../imgs/waring.png')
        }else if(alert.type == ALERT_ERROR){
            var icon = require('../imgs/error.png')
        }else{
            var icon = require('../imgs/success.png')
        }
        return(
            <Modal
                open={alert.visible}
                offset={0}
                overlayBackground={'rgba(0, 0, 0, 0)'}
                animationDuration={200}
                animationTension={40}
                modalDidOpen={() => this._onShow()}
                modalDidClose={() => this._close()}
                closeOnTouchOutside={true}
                containerStyle={[styles.flex1,styles.absoluteCenter]}
                modalStyle={styles.innerContainer}
                disableOnBackPress={false}
              >
                <View>
                    <View style={[styles.rows,styles.absoluteCenter]}>
                        <Image style={styles.icon} source={icon} />
                    </View>
                    <View style={styles.space}></View>
                    <View style={[styles.rows,styles.absoluteCenter]}>
                        <Text style={styles.alertText}>{alert.message}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    alert:state.alert
});
const styles = StyleSheet.create({
    flex1:{
        flex:1,
    },
    absoluteCenter:{
        alignItems:'center',
        justifyContent:'center',
    },
    icon:{
        resizeMode:Image.resizeMode.stretch,
        width:20,
        height:20,
    },
    space:{
        marginBottom:10,
        height:1
    },
    innerContainer:{
        width:windowWidth/3,
        borderRadius:10,
        padding:15,
        backgroundColor:'rgba(0,0,0,0.7)',
    },
    alertText:{
        color:'#fff',
        lineHeight:14,
        fontSize:12
    },
})

export default connect(mapStateToProps)(Alert);
