import { alertError ,goBack, } from '../common/actions'
import {urls,macro as MACRO} from '../common/config.js'
import { getResopnseData,setIdentity ,HttpRequest} from '../common/func.js'
import { Toast } from 'antd-mobile';
export const COUNT_DOWN_BEGIN = 'login/countDownBegin'
export const CHANGE_TEXT = 'login/changeText'
export const CHANGE_CODE = 'login/changeCode'
export const INIT = 'login/init'
export const LOGIN = 'login/login'

export function changePhoneNum(text){
    let validatePhone = checkPhoneNumber(text)
    return { type : CHANGE_TEXT , validatePhone ,text }
}

export function changeVerifyCode(text){
    let validateCode = checkVerifyCode(text)
    return { type : CHANGE_CODE , validateCode ,text}
}

export function sendMessage(phone){
    return dispatch => {
        let config = {
            url:urls.code,
            method:'POST',
            data:{
                phone,
            }
        }
        return dispatch( HttpRequest('',config) )
    }
}

export function login(phoneNums,code){
    return (dispatch) => {
        if (!vilidate({phoneNums,code})) return
        let config = {
            url:urls.login,
            method:'POST',
            data:{
                phone:phoneNums,
                code:code,
            },
        }
        return dispatch(HttpRequest('null',config)).then((response)=>{
            let data = getResopnseData(response)
            if (!response.error && data && data.auth_key) {
                setIdentity(data)
                dispatch ( { type : MACRO.USER_INIT ,identity:data} )
                dispatch(goBack())
            }   
        })
    }
}
function vilidate(data){
    let msg = '';
    if (!checkPhoneNumber(data.phoneNums)) {
        msg = '手机号码有误'
    }else if (!checkVerifyCode(data.code)) {
        msg = '验证码有误'
    }
    if (msg) {
        Toast.info(msg)
        return 0
    }
    return 1
}

function requestLogin(phone,code){
    return {
        type:'null',
        payload: {
            request:{
                url:urls.login,
                method:'POST',
                data:{
                    phone:phone,
                    code:code,
                },
            }
        }
    }
}

function checkPhoneNumber(nums){
    if (nums.match(/^1(3|5|7|8|9)[0-9]{9}$/)) {
        return true
    }
    return false
}

function checkVerifyCode(nums){
    if (nums.match(/[0-9]{4}$/)) {
        return true 
    }
    return false
}