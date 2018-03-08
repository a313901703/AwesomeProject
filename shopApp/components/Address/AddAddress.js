import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SectionList,
} from 'react-native';
import { connect } from 'react-redux';
import {Commstyles,windowWidth} from '../../styles/comm';
import themeStyle from '../../styles/theme';
import { Button,List, InputItem,Toast,WhiteSpace,Picker,WingBlank,Switch,TextareaItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import { add,fetchDistrict } from './action.js'
import { goBack } from '../common/actions.js'


class AddAddress extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '添加收货地址',
    });
    constructor(props) {
        super(props);
        this.state = { default: false };
    }

    componentDidMount() {
        let { district,dispatch } = this.props
        if (district.length <= 0) {
            dispatch( fetchDistrict() )
        }
    }

    _submit(){
        let {getFieldsValue,validateFields} = this.props.form
        let {navigation} = this.props
        let values = getFieldsValue();
        let error = '';
        validateFields((errors, value) => {
            for (let name in errors) {
                error = errors[name].errors[0]['message']
                //Toast.fail(errors[name].errors[0]['message'],1);
                break;
            }
        });
        if (values.phone) {
            values.phone = values.phone.replace(/\s/g, '')
            if (values.phone.length != 11) {
                error = '请输入正确的手机号码'
            }
        }
        values.default = this.state.default
        if (error) {
            Toast.fail(error,2)
        }else{
            navigation.dispatch( add(values) ).then((response)=>{
                if (response.payload) {
                    Toast.success('添加地址成功',3)
                    navigation.dispatch( goBack())
                }
            })
        }
    }

    _onCheck(value){
        this.setState({
            default:value
        })
    }

    render() {
        const { getFieldProps } = this.props.form;
        let { district } = this.props
        let switchColor = global.greenColor
        return (
            <View style={Commstyles.container}>
                <List>
                    <InputItem
                        {...getFieldProps('name',{
                            rules: [
                                {required: true,'message':'收货人必填'}
                            ],
                        })}
                        styles={StyleSheet.create(themeStyle)}
                    >收货人</InputItem>
                    <InputItem
                        {...getFieldProps('phone',{
                            rules: [ 
                                {required:true,message:'联系电话必填'},
                            ]
                        })}
                        type="phone"
                        styles={StyleSheet.create(themeStyle)}
                        maxLength={13}
                    >联系电话</InputItem>
                    <Picker extra="请选择"
                        data={district}
                        title="Areas"
                        {...getFieldProps('district')}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                      <List.Item arrow="horizontal"><Text style={{fontSize:15}}>所在地区</Text></List.Item>
                    </Picker>
                    <TextareaItem
                        {...getFieldProps('detailed_address',{
                            rules: [
                                {required: true,'message':'请填写详细地址'},
                            ],
                        })}
                        rows={4}
                        count={100}
                        placeholder={'请填写详细地址'}
                    />
                    <List.Item
                        extra={<Switch
                            onChange={(checked)=>this._onCheck(checked)}
                            checked={this.state.default}
                            color={switchColor}
                        />}
                      >设为默认</List.Item>
                </List>
                <WhiteSpace size="xl" />
                <WingBlank>
                    <Button style={{backgroundColor:global.greenColor}} onClick={()=>this._submit()}>
                        <Text style={{color:"#fff"}}>保存</Text>
                    </Button>
                </WingBlank>
            </View>
        );
    }
}

const AddressForm = createForm()(AddAddress);
const mapStateToProps = state => ({
    district:state.district.items,
});
export default connect(mapStateToProps)(AddressForm);

