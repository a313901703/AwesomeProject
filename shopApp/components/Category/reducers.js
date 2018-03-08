import { getResopnseData } from '../common/func.js'
import {macro as MACRO} from '../common/config.js'


const categoryInitState = {
    isFetching:false,
    items:[],
}
export function category(state = categoryInitState,action){
    switch(action.type){
        case MACRO.CATEGORY:
            return {...state,isFetching:true}
        case MACRO.CATEGORY + '_SUCCESS':
            let data = getResopnseData(action)
            data = data.data ? data.data : []
            return {...state,isFetching:false,items:data}
        case MACRO.CATEGORY + '_FAIL':
            return {...state,isFetching:false}
        default:
            return state;
    }
}