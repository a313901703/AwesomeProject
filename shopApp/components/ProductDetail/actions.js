import {getResopnseData,HttpRequest} from '../common/func.js'
import {urls,macro as MACRO} from '../common/config'
import { ALERT_WORING,ALERT_SUCCESS,ALERT_ERROR,ALERT_INIT } from '../common/actions'
import { Modal,Toast } from 'antd-mobile';

export const INIT = 'productDetail/Init'
export const COMMENT = 'productDetail/comment'
export const PRODUCTINFO = 'productDetail/productInfo'
export const CHANGE_FORMAT= 'productDetail/changeFormat'
export const PARAMS = 'productDetail/params'
export const FORMATS= 'productDetail/formats'
export const CHOOSE = 'productDetail/choose'
export const ADD_NUMBER = 'productDetail/addNumber'
export const SUBTRACT_NUMBER = 'productDetail/subtractNumber'
export const CHOOSE_NUMS = 'productDetail/chooseNums'
export const ADD_CART_BEIGN = 'productDetail/addCartBegin'
export const ADD_CART = 'productDetail/addCart'
export const ADD_CART_FAIL = 'productDetail/addCartFail'
export const GO_CART = 'productDetail/goCart'
export const COLLECT = 'productDetail/collect'

//初始化
export function init(){
    return { type : INIT }
}

//拉取商品信息
export function productInfo(id){
    return (dispatch,getState) => {
        let products = getState().products
        // if (products[id]) {
        //     dispatch ({ type : MACRO.SET_PRODUCT_INFO ,data : products[id] })
        // }   
        let config = {
            url : urls.products + '/' + id + '?expand=props,propsCombi,collection'
        }
        return dispatch(HttpRequest([MACRO.FETCH_PRODUCTS,MACRO.FETCH_PRODUCT,MACRO.FETCH_PRODUCTS_FAIL],config))
    }
}

export function productParmas(visible = {params:false,formats:false}){
    return { type : PARAMS ,visible } 
}

export function productFormats(){
    return {type:FORMATS}
}
//选择规格
export function chooseFormat(id,value = {},names={}){
    return (dispatch,getState) => {
        dispatch({ type : CHOOSE,value,names} )
        if (propsCombi = getPropsCombi(id,getState())) {
            return dispatch({ type : CHANGE_FORMAT,propsCombi} )
        }
    }
}

export function changeNums(type){
    if (type == 'add') {
        return { type : ADD_NUMBER }
    }
    return (dispatch,getState) => {
        let state = getState()
        let choose = state.chooseFormat
        if (choose.nums > 1) {
            return dispatch({ type : SUBTRACT_NUMBER } )
        }
    }    
}

export function getPropsCombi(id,state){
    let productInfo = state.products.products[id]
    let choose = state.chooseFormat.choose
    let propsCombi = productInfo.propsCombi
    if (Object.keys(choose).length == productInfo.props.length) {
        _choose = Object.values(choose)
        _choose.sort();
        for(i in propsCombi){
            let item = propsCombi[i].pids.split(',');
            item.sort()
            if (item.toString() == _choose.toString()) {
                return propsCombi[i]
            }
        }
    }
    return false
}
//拉取评论
export function requestComment(){
    return dispatch => {
        let config = {
            url : urls.comments
        }
        return dispatch(request(COMMENT,config))
    }
}

//加入购物车
export function addToCart(id){
    return (dispatch,getState) => {
        let state = getState()
        let productInfo = state.products.products[id]
        let cart = state.cart
        let choose = state.chooseFormat
        if (!cart.isFetching && productInfo.id) {
            //未选择产品规格
            if (!choose.id && productInfo.propsCombi.length > 0) {
                Toast.offline('请选择产品规格',2);
                return
            }
            let params = {}
            params.productId = productInfo.id
            params.nums = choose.id ? choose.nums : 1
            params.propsCombiId = choose.id ? choose.id : 0
            let config = {
                url:urls.payCart,
                method:'POST',
                data:params,
            }
            return dispatch(HttpRequest(ADD_CART,config,1))
        }else{
            Toast.offline('请求异常，请稍后重试',2);
        }
    }
}

//收藏
export function collect(id,status){
    return (dispatch,getState) => {
        let config = {
            url:urls.collect,
            params:{
                id,
                status
            },
        }
        return dispatch( HttpRequest(['',MACRO.PRODUCT_COLLECT,'null'],config,1) ).then((response)=>{
            if (response.payload) {
                dispatch( {type:MACRO.CHANGE_PRODUCT,id,status} )
            }
        })
    }
}


