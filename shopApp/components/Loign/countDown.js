import React, { Component } from 'react';
import { StyleSheet, Text, View,} from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button'
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';

export default class CountDown extends Component{
    static defaultProps = {
        styles:{
            width:'100%',
            height:'100%',
            backgroundColor:themeColor,
            borderColor:themeColor,
            padding:5
        },
        color:'#fff',
        text:'发送验证码',
        overText:'重新发送',
        //disabledText:'重新发送'
        disableStyle:{
            backgroundColor:themeColor,
            borderColor:themeColor,
        },
        limit:60,
        shouldCountDown:true,
    }
    constructor(props) {
        super(props);
        this.state = { 
            limit: this.props.limit,
            disabled:false,
            text:this.props.text,
            input:'',
        };
    }

    _countBegin(){
        this.props.onPress && this.props.onPress();
        if (!this.props.shouldCountDown) {
            //this.props.onPress && this.props.onPress();
            return;
        }
        this.setState({
            disabled:true,
        })
        let _this = this
        // 每1000毫秒对showText状态做一次取反操作
        this.timer = setInterval(() => {
            let limit = _this.state.limit
            if (limit > 0) {
                limit -= 1
                _this.setState({
                    limit :limit,
                });
            }else{
                this.setState({
                    disabled:false,
                    text:_this.props.overText,
                    limit:_this.props.limit,
                })
                this.timer && clearTimeout(this.timer)
            }
        }, 1000);
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Button style={this.props.styles} isDisabled={this.state.disabled} onPress={()=>this._countBegin()}>
                    <Text style={{color:this.props.color}}>
                        {this.state.disabled ? this.props.overText + '(' + this.state.limit + ')' : this.state.text}
                    </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    disablebutton:{
        backgroundColor:themeColor,
        borderColor:themeColor,
    },
})

