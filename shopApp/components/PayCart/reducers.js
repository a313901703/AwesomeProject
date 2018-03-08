import { getResopnseData } from '../common/func.js'
import {macro as MACRO} from '../common/config.js'


const payCartInit = {
    isFetching:false,
    items:{},
    count:{},
}
export function payCart(state = payCartInit,action){
    switch(action.type){
        case MACRO.FETCH_PAY_CART_LIST:
            return {...state,isFetching:true}
        case MACRO.FETCH_PAY_CART_LIST_SUCCESS:
            let data = getResopnseData(action)
            count = data.count
            data = data.data ? data.data : []
            return {...state,isFetching:false,items:data,count:count}
        case MACRO.FETCH_PAY_CART_LIST_FAIL:
            return {...state,isFetching:false}
        case MACRO.SET_PAY_CART_LIST:
            items = action.items
            count = action.count
            return {...state,isFetching:false,items:items,count:count}
        case MACRO.CLEAR_PAY_CART:
            return payCartInit
        default:
            return state;
    }
}