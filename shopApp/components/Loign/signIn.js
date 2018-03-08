import React, { Component } from 'react';
import { StyleSheet, Text, View,Image,TextInput} from 'react-native';
import { connect } from 'react-redux';
import Alert from '../Alert.js'
import Button from 'apsl-react-native-button'

import CountDown from './countDown'
import ThirdPartSignin from './thirdPartSignin'
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';
import { Toast } from 'antd-mobile';
import {changePhoneNum,changeVerifyCode,login,sendMessage} from './actions'

class SignIn extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '登录',
    });

    _onChangeText(text){
        let {dispatch} = this.props
        dispatch(changePhoneNum(text))
    }
    _onChangeCode(text){
        let {dispatch} = this.props
        dispatch(changeVerifyCode(text))
    }
    _countDownBegin(text){
        let {dispatch,loginForm} = this.props
        if (!loginForm.validatePhone) {
            Toast.info(text)
        }else{
            dispatch(sendMessage(loginForm.phoneNums))
        }
    }

    _login(){
        let {dispatch,loginForm} = this.props
        dispatch(login(loginForm.phoneNums,loginForm.code)) 
    }

    componentDidMount(){
        let {dispatch} = this.props
    }
    render(){
        let {loginForm} = this.props
        return (
            <View style={Commstyles.container}>
                <View style={styles.form}>
                    <View style={[styles.formGroup,styles.formInline]}>
                        <TextInput
                            style={[styles.formItems,styles.formPhone]}
                            onChangeText={(text) => this._onChangeText(text)}
                            placeholder={'手机号'}
                            keyboardType={'numeric'}
                            maxLength={11}
                          />
                        <View style={styles.formButtonBox}>
                            <CountDown shouldCountDown={loginForm.validatePhone} onPress={()=>this._countDownBegin('请输入正确的手机号码')}/>
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <TextInput
                            style={styles.formItems}
                            onChangeText={(text) => this._onChangeCode(text)}
                            placeholder={'验证码'}
                            secureTextEntry={true}
                            keyboardType={'numeric'}
                            maxLength={4}
                          />
                    </View>  
                    <View style={styles.hint}>
                        <Text style={styles.hintText}>温馨提示</Text>
                    </View>                  
                    <View style={styles.loginButtonBox}>
                        <Button style={styles.loginButton} onPress={()=>this._login()}>
                            <Text style={{color:'#fff',fontWeight:'bold'}}>登录</Text>
                        </Button>
                    </View>
                </View>
                <ThirdPartSignin />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    loginForm:state.loginForm,
});

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        alignItems:'center',
    },
    formGroup:{
        width:windowWidth,
        //backgroundColor:'#fff',
        marginBottom:0.8
    },
    formInline:{
        flexDirection: 'row',
    },
    formPhone:{
        flex:2,
    },
    formButtonBox:{
        flex:1,
        padding:5,
        backgroundColor:'#fff',
        height: 40,
    },
    formButton:{
        width:'100%',
        height:'100%',
        backgroundColor:themeColor,
        borderColor:themeColor,
        padding:5,
    },
    formItems:{
        height: 40, 
        backgroundColor:'#fff',
        paddingHorizontal:10,
    },
    hint:{
        marginTop:10,
        paddingHorizontal:10,
    },
    hintText:{
        color:'#aaa',
        fontSize:12,
    },
    loginButtonBox:{
        marginTop:10,
        paddingHorizontal:10,
    },
    loginButton:{
        backgroundColor:'#00dd33',
        borderColor:'#00dd33',
        height:40,
    },
})
export default connect(mapStateToProps)(SignIn);
