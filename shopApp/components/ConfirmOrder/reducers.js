import { getResopnseData } from '../common/func.js'
import {macro as MACRO} from '../common/config.js'


const addressInit = {
    isFetching:false,
    items:[],
}
export function address(state = addressInit,action){
    switch(action.type){
        case MACRO.ADDRESS:
            return {...state,isFetching:true}
        case MACRO.ADDRESS_SUCCESS:
            let data = getResopnseData(action)
            data = data.data ? data.data : []
            return {...state,isFetching:false,items:data}
        case MACRO.ADDRESS_FAIL:
            return {...state,isFetching:false}
        default:
            return state;
    }
}