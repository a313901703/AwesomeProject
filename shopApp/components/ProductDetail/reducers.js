import * as t from './actions'
import {getResopnseData} from '../common/func.js'
import {macro as MACRO} from '../common/config'

//产品详情
const initProductInfo = {
    isFetching:false,
    endFetching:false,
    data:{},
}
export function productInfo(state = initProductInfo, action){
    let PRODUCTINFO_SUCCESS = t.PRODUCTINFO + '_SUCCESS'
    let PRODUCTINFO_FAIL = t.PRODUCTINFO + '_FAIL'
    switch(action.type){
        case t.INIT:
            return initProductInfo
        case t.PRODUCTINFO:
            return {...state,isFetching:true}
        case PRODUCTINFO_SUCCESS:
            let data = getResopnseData(action)
            return {...state,data:data.data,isFetching:false,endFetching:true}
        case t.PRODUCTINFO_FAIL:
            return {...state,isFetching:false,isFetching:false}
        case t.CHANGE_FORMAT:
            Object.assign(state.data,{
                price:action.propsCombi.sale_price,
                stock:action.propsCombi.stock,
            })
            return state
        case t.COLLECT:
            let collection = getResopnseData(action)
            return {...state.data,collection:collection}
        case MACRO.SET_PRODUCT_INFO:
            return {...state,data:action.data}
        default:
            return state;
    }
}

//产品规格信息
export function formats(state={
    formats:false,
    params:false,
},action){
    switch(action.type){
        case t.PARAMS:
        case t.FORMATS:
            return Object.assign({},state,action.visible)
        default:
            return state;
    }
}

const _chooseState = {
    id : 0,
    nums : 1,
    choose : {},
    names:{},
}
export function chooseFormat(state = _chooseState , action){
    switch(action.type){
        case t.INIT:
            return _chooseState;
        case t.CHOOSE:
            let choose = Object.assign({},state.choose,action.value)
            let names = Object.assign({},state.names,action.names)
            return Object.assign({},state,{
                choose:choose,
                names:names
            })
        case t.CHANGE_FORMAT:
            return Object.assign({},state,{
                id:action.propsCombi.id,
            })
        case t.ADD_NUMBER:
            return Object.assign({},state,{
                nums:state.nums + 1, 
            })
        case t.SUBTRACT_NUMBER:
            return Object.assign({},state,{
                nums:state.nums - 1, 
            })
        default:
            return state;
    }
}

export function cart(state = {
    isFetching:false,
    items:[],
},action){
    switch(action.type){
        case t.ADD_CART_BEIGN:
            return Object.assign({},state,{isFetching:true})
        case t.ADD_CART:
            return Object.assign({},state,{isFetching:false})
        case t.ADD_CART_FAIL:
            //TODO 加入失败
            return Object.assign({},state,{isFetching:false})
        default:
            return state
    }
}

export function Comment(state = [], action){
    // if (action.type = t.COMMENT) {
    //     let response = getResopnseData(action)
    //     if (response && response.errcode == 0) {
    //         state = response.ret_msg.data
    //     }
    // }
    return state
}