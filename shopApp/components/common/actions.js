import { urls,macro as MACRO } from './config.js'

export const ROUTERS = 'routers';
export const MODAL   = 'modal';
export const ALERT_WORING = 'comm/alertWaring';
export const ALERT_SUCCESS = 'comm/alertSuccess';
export const ALERT_ERROR = 'comm/alertError';
export const ALERT_INIT  = 'init';
export const SIGN_IN = 'signIn';

const loginRouter = [
    'SignIn','PayCart','Orders','ConfirmOrder','Address','AddAddress','Pay',
];

//路由切换
export function routers(routeName,params = {}){
    return (dispatch,getState) =>{
        let user = getState().user
        if (!user.auth_key && loginRouter.includes(routeName)) {
            return dispatch({ type: SIGN_IN } )
        }
        return dispatch({ type:ROUTERS,routeName,params})
    }
}

export function signIn(login = false){
    return { type: SIGN_IN , login }
}

export function goBack(){
    return { type : 'goBack' } 
}
//提示框
export function alertWaring(message){
    return { type : ALERT_WORING,message }
}

export function alertSuccess(message){
    return { type : ALERT_SUCCESS,message }
}

export function alertError(message){
    return { type : ALERT_ERROR,message }
}

export function alertInit(){
    return { type : ALERT_INIT }
}
//收藏
export function commCollect(id,status = 0,_dispatch = ''){
    return {
        type : 'nothing',
        payload:{
            request:{
                url:urls.collect,
                params:{
                    id : id,
                    status : status
                },
            },
        }
    }
}
function requestCollect(id,status = 0){
    return {
        type : 'nothing',
        payload:{
            request:{
                url:urls.collect,
                params:{
                    id : id,
                    status : status
                },
            },
        }
    }
}
export function setProduct(data){
    return { type : MACRO.SET_PRODUCT_INFO , data }
}

export function setProducts(data){
    return { type : MACRO.SET_PRODUCTS , data }
}