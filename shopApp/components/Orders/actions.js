import { getResopnseData,setIdentity ,HttpRequest} from '../common/func.js'
import {urls,macro as MACRO} from '../common/config.js'

export function fetchOrders(type = 'fetch'){
    return (dispatch , getState) => {
        let orders = getState().orders
        let status = orders.currentStatus
        page = shouldFetch(orders)
        if (!page) {
            //TODO 没有啦
        }else{
           let config = {
                url : urls.orders, 
                params:{
                    status,
                    page,
                },
            }
            let types = type == 'fetch' ? MACRO.ORDERS : [MACRO.ORDERS,MACRO.ORDERS_REFRESH,MACRO.ORDERS_FAIL]
            return dispatch(HttpRequest(types,config,true))
        }
    }
}  

function shouldFetch(orders){
    let status = orders.currentStatus
    //let count = orders.count.count
    let page = orders.page
    if (orders.isFetching || orders.noMore) 
        return false
    return page + 1
}

export function setStatus(status){
    return { type : MACRO.SET_ORDER_STATUS ,status }
}
//继续
export function changeOrderStatus(id,type){
    return (dispatch) => {
        if ('pay' == type) {

        }else if('cancel' == type){
            return dispatch( cancel(id) )          
        }
    }
}
//订单支付
export function pay(){

}

export function cancel(id){
    return (dispatch , getState) => {
        let config = {
            url : urls.orders + '/' + id,
            data:{ status:'-2' },
            method:'PUT',
        }
        return dispatch(HttpRequest(['','',''],config,true)).then((response)=>{
            dispatch({type:MACRO.REMOVE_ORDER,id})
        })
    }
}




