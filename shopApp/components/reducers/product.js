import {getResopnseData} from '../common/func.js'
import {macro as MACRO} from '../common/config.js'

const initProductState = {
    isFetching:false,
    items:[],
    config:{
        page:1,
        count:0,
        limit:10,
    },
    products:{},
    lists:[],
    recommends:[],
    searchLists:[],
}
export function products(state = initProductState, action){
    let data
    let lists = [],
        products = state.products,
        recommends = [];
    switch(action.type){
        case MACRO.FETCH_PRODUCTS:
            return {...state,isFetching:true}
        case MACRO.FETCH_PRODUCTS_SUCCESS:
            data = getResopnseData(action)
            data = data.data
            products = {...products,...data}
            lists = [...Object.keys(data),...state.lists]
            lists = Array.from(new Set(lists))
            return {...state,lists,isFetching:false,config:{...state.config,...data.count}}
            return state
        case MACRO.FETCH_PRODUCTS_FAIL:
            return {...state,isFetching:false}
        case MACRO.PRODUCTS_RECOMMEND_SUCCESS:
            data = getResopnseData(action)
            data = data.data ? data.data : {}
            products = {...products,...data}
            recommends = [...Object.keys(data),...state.recommends]
            recommends = Array.from(new Set(recommends))
            recommends = recommends.sort((a,b)=> b - a)
            return {...state,recommends,products}
        case MACRO.FETCH_PRODUCT:
            data = getResopnseData(action)
            data = data.data ? data.data : {}
            products = Object.assign({},products,{[data.id]:data})
            return {...state,isFetching:false,products}
        case MACRO.PRODUCT_COLLECT:
            return state
        case MACRO.CHANGE_PRODUCT:
            products[action.id]['collection'] = action.status
            return {...state,products}
        default:
            return state
    }
}

