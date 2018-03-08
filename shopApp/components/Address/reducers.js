import { getResopnseData } from '../common/func.js'
import {macro as MACRO} from '../common/config.js'


const addressInit = {
    isFetching:false,
    items:{},
    default:0,
}
export function address(state = addressInit,action){
    let data;
    let items;
    let _default = state.default;
    switch(action.type){
        case MACRO.ADDRESS:
            return {...state,isFetching:true}
        case MACRO.ADDRESS_SUCCESS:
            data = getResopnseData(action)
            items = data.data ? data.data : {}
            for(let addressid in items){
                if (items[addressid]['default']){
                    _default = items[addressid]['id']
                    break;
                }
            }
            return {...state,isFetching:false,items,default:_default}
        case MACRO.ADDRESS_FAIL:
            return {...state,isFetching:false}
        case MACRO.ADDRESS_ADD_SUCCESS:
            data = getResopnseData(action)
            data = data.data
            items = state.items
            _default = state.default
            if (data.default) {
                items = setDefault(items)
                _default = data['id']
            }
            items = Object.assign({},items,{[data['id']] : data})
            return {...state,isFetching:false,items,default:_default}
        default:
            return state;
    }
}
const districtInit = {
    items:[],
    isFetching:false
}
export function district(state = districtInit,action){
    switch(action.type){
        case MACRO.DISTRICT:
            return {...state,isFetching:true}
        case MACRO.DISTRICT + '_SUCCESS':
            let data = getResopnseData(action)
            return {...state,isFetching:false,items:data.data}
        case MACRO.DISTRICT + '_FAIL':
            return {...state,isFetching:false}
        default:
            return state;
    }
}

function setDefault(obj){
    for(let key in obj){
        obj[key]['default'] = 0
    }
    return obj
}
function arrayToObj(array,key){
    if (!Array.isArray(array)) {
        return {}
    }
    let _obj = {}
    for (var i = 0; i < array.length; i++) {
        if (!array[i][key]) continue
        array[i]['default'] = 0;
        _obj[array[i][key]] = array[i]
    }
    return _obj
}

function arraySort(array,key){
    if (!Array.isArray(array)) {
        return []
    }
    array.sort(function(a,b){
        return b[key] - a[key]
    })
}
