import { getResopnseData,setIdentity ,HttpRequest} from '../common/func.js'
//import * as MACRO from '../common/macro.js'
import {urls,macro as MACRO} from '../common/config.js'

export function fetchPayCart(){
    return dispatch => {
        let config = {
            url : urls.payCart, 
        }
        return dispatch(HttpRequest(MACRO.FETCH_PAY_CART_LIST,config,true))
    }
}

export function changeNums(type,id){
    return (dispatch,getState) => {
        let state = getState()
        let nums = couldChangenums(state,type,id)
        if (nums){
            //先更新页面后请求
            let items = state.payCart.items
            items[id].nums = nums
            let count = getItemsCount(items)
            dispatch( { type : MACRO.SET_PAY_CART_LIST , items ,count } )

            let config = {
                url : urls.payCart + '/' + id,
                data:{ nums:nums },
                method:'PUT',
            }
            return dispatch(HttpRequest(MACRO.FETCH_PAY_CART_LIST,config,true))
        }
    }
}

function couldChangenums(state,type,id){
    let isFetching = state.payCart.isFetching
    let items = state.payCart.items
    if (items[id] && !isFetching) {
        if (type == 'add') {
            return items[id].nums + 1
        }else if (items[id].nums > 1) {
            return items[id].nums - 1
        }
    }
    return 0
}

export function itemDelete(id){
    return (dispatch,getState) => {
        let items = getState().payCart.items
        if (items[id]) 
            delete items[id]
        let count = getItemsCount(items)
        dispatch( { type : MACRO.SET_PAY_CART_LIST , items ,count } )
        let config = {
            url : urls.payCart + '/' + id,
            method:'DELETE',
        }
        return dispatch(HttpRequest(MACRO.FETCH_PAY_CART_LIST,config,true))
    }
}

export function getItemsCount(items){
    let _items = Object.values(items)
    let price = 0
    let nums = 0
    _items.forEach(function(el,index){
        price += el['price'] * el['nums']
        nums += el['nums']
    })
    return {price,nums}
}



