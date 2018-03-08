import { getResopnseData } from '../common/func.js'
import {macro as MACRO} from '../common/config.js'

const initUserState = {}
export function user(state={},action){
    switch(action.type){
        case MACRO.USER_INIT:
        case MACRO.USER_INFO:
            return {...state,...action.identity}        
        default:
            return state
    }
}