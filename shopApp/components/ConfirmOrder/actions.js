import {httpBuildQuery,HttpRequest,getResopnseData} from '../common/func.js'
import { urls,macro as MACRO } from '../common/config.js'
import {routers} from '../common/actions.js'

export function createOrder(data){
    return (dispatch,getState) =>{
        let orders = getState().orders
        if (orders.isFetching) return
        let config = {
            url : urls.orders,
            data,
            method:'POST'
        }
        return dispatch(HttpRequest([MACRO.ORDERS,MACRO.CREATE_ORDER,MACRO.ORDERS_FAIL],config,true)).then((response)=>{
            if (response.payload) {
                dispatch({ type: MACRO.CLEAR_PAY_CART})
                //发起支付
                dispatch( routers('Pay') )
            }
        });
    }
}