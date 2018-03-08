import axios from 'axios'
import {config,baseUrl} from '../common/config'
export const ROUTERS = 'routers';
export const MODAL   = 'modal';

var instance = axios.create({
    baseURL: 'http://www.dev.com/api/v1/goods/',
    headers: config.headers,
});

function requestGet(params = {}){
}

function requestPost(){

}
export function routers(routeName,params = {}){
    return { type:ROUTERS,routeName:routeName,params:params}
}

export function modal(visible = true){
    return { type : MODAL,visible }
}

export function sweetAlert(visible,text = '' , status = true){
    return { type : 'sweetAlert',visible,text,status } 
}

export function joinCart(productid){
    return {
        types:['joining','joinSuccess','sweetAlert'],
        payload: {
            request:{
                url:'/joinpaycart.html?productid=1',
            }
        }
    }
}

function requestFail(error,typeName){
    let message = ''
    if (error.response && error.response.data.message) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        message = error.response.data.message;
        //console.log(error.response.data);
    } else {
        message = 'request false: '.error.message;
        //console.log('Error', error.message);
    }
    return {type:'sweetAlert',visible:true,text:message,status:false}
}

function shouldFetch(state){
    const shoppingCart = state.shoppingCart
    if (shoppingCart.isFetching) {
        return false
    }
    return true
}

function joining(){
    return {type:'joining'}
}

function joinCartSuccess(data){
    let items = data.data
    return dispatch => {
        dispatch(sweetAlert(true,'加入成功'))
        return dispatch({type: 'joinSuccess',items})
    }
}
