import { getResopnseData ,HttpRequest} from '../common/func.js'
//import * as MACRO from '../common/macro.js'
import {urls,macro as MACRO} from '../common/config.js'

export function init(){
    return async dispatch =>{
        let identity = await global.storage.load({
            key: 'identity',
            autoSync: false,
        })
        identity = (identity && identity.auth_key) ? identity : {}
        return dispatch ( { type : MACRO.USER_INIT ,identity} )
    }
}

export function updateUserInfo(key,value){
    return (dispatch,getState) => {
        let user = getState().user
        user[key] = value
        return dispatch ( { type : MACRO.USER_INIT ,identity:user} )
    }
    
}