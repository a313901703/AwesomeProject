import { getResopnseData } from '../common/func.js'
import {macro as MACRO} from '../common/config.js'
import { normalize,schema,arrayOf } from 'normalizr'

export function orderStatus(state = 0,action){
    switch(action.type){
        case MACRO.SET_ORDER_STATUS:
            return action.status
        default:
            return state;
    }
}
const ordersInit = {
    isFetching:false,
    items:{},
    products:{},
    //count:100,
    page:0,
    noMore:false,
    currentStatus:0,
    pageSize:10,
}
export function orders(state = ordersInit,action){
    let items
    let data
    let productsSchema = new schema.Entity('products');
    let orderSchema = new schema.Entity('orders',{
        products : [ productsSchema ],
    });
    let orderListSchema = [orderSchema]
    let _state = {}

    switch(action.type){
        case MACRO.INIT:
            return ordersInit
        case MACRO.ORDERS:
            return {...state,isFetching:true}
        case MACRO.ORDERS_SUCCESS:
        case MACRO.ORDERS_REFRESH:
            data = getResopnseData(action)
            items = data.data ? data.data : []
            let noMore = items.length >= state.pageSize ? false : true
            items = normalize(items,orderListSchema)
            //refresh 刷新page 和 list列表
            if (action.type == MACRO.ORDER_REFRESH) {
                state = ordersInit
            }
            _state = {
                isFetching:false,
                products:{...state.products,...items.entities.products},
                items:{...state.items,...items.entities.orders},
                page:data.count.page,
                noMore,
            }
            //console.log('_state',{...state,..._state})
            return {...state,..._state}
        case MACRO.ORDERS_FAIL:
            return {...state,isFetching:false}
        case MACRO.SET_ORDER_STATUS:
            return {...state,currentStatus:action.status,noMore:false,page:0}
        case MACRO.REMOVE_ORDER:
            items = state.items
            for (var i = 0; i < items.length; i++) {
                if (action.id == items[i]['id']) {
                    delete items[i]
                }
            }
            return {...state,items}
        default:
            return state;
    }
}