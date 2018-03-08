import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
//组件
import Icon from 'react-native-vector-icons/FontAwesome';
import {Commstyles,themeColor,windowWidth,windowHeight} from '../../styles/comm.js';
import { List,Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { updateUserInfo } from './actions.js'

const Item = List.Item;
const prompt = Modal.prompt;

class UserInfo extends Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '用户信息修改',
    });
    componentDidMount(){
        let { user } = this.props
    }
    _imagePicker(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('image',image);
        });
    }
    _updatePasswd(passwd){
        console.log('passwd',password)
    }

    _updateIdentity(key,value){
        let { navigation } = this.props
        navigation.dispatch( updateUserInfo(key,value) )
    }

    render(){
        let { user } = this.props
        return(
            <View style={Commstyles.container}>
                <List >
                    <Item arrow="horizontal" onClick={() =>this._imagePicker()}>头像</Item>
                    <Item 
                        extra={user.username} 
                        arrow="horizontal" 
                        onClick={() => prompt('修改平台名称', '修改平台名称', [
                            { text: '取消' },
                            { text: '确定', onPress: value => this._updateIdentity('username',value) },
                        ])}>
                        平台名称</Item>
                    <Item extra={user.phone} arrow="horizontal" onClick={() => {}}>手机号码</Item>
                    <Item 
                        extra='修改' 
                        arrow="horizontal" 
                        onClick={() => prompt(
                            '请输入密码',
                            '密码为8-16位字母+数字组成的字符串',
                            [
                            { text: '取消' },
                            { text: '提交', onPress: password => this._updatePasswd(password) },
                            ],
                            'secure-text',
                        )}
                    >密码</Item>
                </List>
                <WhiteSpace size="lg"/>
                <Button type="ghost">退出账户</Button>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    user:state.user,
});
export default connect(mapStateToProps)(UserInfo);
