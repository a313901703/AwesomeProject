import {httpBuildQuery,HttpRequest,getResopnseData} from '../common/func.js'
import { urls,macro as MACRO } from '../common/config.js'
import {setProducts} from '../common/actions.js'

export const RECOMMEND = '/homepage/recommend'

export function fetchProducts(limit = 10){
    return (dispatch,getState) => {
        if (params = productCouldFetch(getState,limit)) {
            let config = {
                url : urls.products,
                params:params
            }
            return dispatch(HttpRequest(MACRO.FETCH_PRODUCTS,config))
        }
    }
}

function productCouldFetch(getState,limit){
    let products = getState().products
    if (products.isFetching) 
        return false
    let page = products.config.page
    return { page , limit }
}

export function requestProductsNew(){
    return (dispatch) => {
        let config = {
            url : urls.recommend
        }
        return dispatch(HttpRequest(MACRO.PRODUCTS_RECOMMEND,config)).then((response)=>{
            // let data = getResopnseData(response)
            // if (response.payload && data.data.length) {
            //     //dispatch( setProducts(data) )
            // }
        })
    }
}
