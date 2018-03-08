import  * as t from './actions'
import {macro as MACRO} from '../common/config.js'
import {getResopnseData} from '../common/func.js'

const initProductState = {
    isFetching:false,
    items:{},
    config:{
        page:1,
        count:0,
        limit:10,
    },
    products:{},
    lists:[],
    recommends:[],
}

export function productsRecommend(state = initProductState, action){
    return initProductState
    // let RECOMMEND_SUCCESS = MACRO.PRODUCTS_RECOMMEND + '_SUCCESS'
    // let data
    // let lists = [],
    //     products = state.products,
    //     recommends = [];
    // switch(action.type){
    //     case MACRO.RECOMMEND_SUCCESS:
    //         data = getResopnseData(action)
    //         data = data.data ? data.data : {}
    //         products = {...products,...data}
    //         recommends = Object.keys(data)
    //         return {...state,recommends,products}
    //     default:
    //         return state;

    // }
}