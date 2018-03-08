import {httpBuildQuery,HttpRequest,getResopnseData} from '../common/func.js'
import { urls,macro as MACRO } from '../common/config.js'
//import {} from '../common/actions.js'

export function fetchAddress(){
    return dispatch => {
        let config = {
            url : urls.address,
        }
        return dispatch(HttpRequest(MACRO.ADDRESS,config,false));
    }
}

export function add(data){
    return dispatch => {
        let config = {
            url : urls.address,
            data,
            method:'POST',
        }

        return dispatch(HttpRequest([MACRO.ADDRESS,MACRO.ADDRESS_ADD_SUCCESS,MACRO.ADDRESS_FAIL],config,false));
    }
}

export function fetchDistrict(){
    return (dispatch,getState)=>{
        let district = getState().district;
        if (district.isFetching) return;
        let config = {
            url : urls.address + '/district',
        }
        return dispatch(HttpRequest(MACRO.DISTRICT,config,false));
    }
}

export function setDefault(id){
    return dispatch => {
        let config = {
            url : urls.address + '/' + id,
            data:{
                default:1
            },
            method:'PUT'
        }
        return dispatch(HttpRequest([MACRO.ADDRESS,MACRO.ADDRESS_ADD_SUCCESS,MACRO.ADDRESS_FAIL],config,false));
    }
}
