import {HttpRequest} from '../common/func.js'
import { urls,macro as MACRO } from '../common/config.js'
import {routers} from '../common/actions.js'

export function fetchCategory(){
    return (dispatch,getState) =>{
        let category = getState().category
        if (category.isFetching) return
        let config = {
            url : urls.category,
        }
        return dispatch(HttpRequest(MACRO.CATEGORY,config));
    }
}