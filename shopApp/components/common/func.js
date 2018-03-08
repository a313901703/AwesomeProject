import queryString from 'query-string'
import { Toast } from 'antd-mobile';

//默认一个非登录用户
const DEF_TOKEN = 'O78fivtK39i94nDE3kaKy_n7RhH6hKXs'

export function httpBuildQuery(params = []){
    return params ? '?' + queryString(params) : '';
}

/**
 * 解析中间件返回的数据
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function getResopnseData(response){
    let ret
    ret = response.error ? response.error.response : response.payload
    response && response.payload && Toast.hide()
    if (ret && ret.data && ret.data.ret_msg) {
        return ret.data.ret_msg
    }else{
        return response.error ? '请求失败' : null; 
    }
}

/**
 * HttpRequest function
 * @param  type        redux 执行的type
 * @param  config      axios中间件请求参数
 * @param  checkaccess 请求前是否判断是否登录
 */
export  function HttpRequest(type,config,checkaccess = false){
    let params = Object.assign({token:DEF_TOKEN},config.params)
    config.params = params;
    return async dispatch => {
        try{
            let identity = await global.storage.load({
                key: 'identity',
                autoSync: false,
            })
            if (identity && identity.auth_key) {
                Object.assign(config.params,{token:identity.auth_key})
            }
        }catch (err) {
            //如果需要登录  则跳入登录
            if (checkaccess) {
                return dispatch({ type : 'signIn' })
            }
        }
        return dispatch(getRequest(type,config))
    }
}

function getRequest(type,config){
    let requestConfigs = {
        payload: {
            request : config
        },
    }
    requestConfigs.types = Array.isArray(type) ? type : [type,type + '_SUCCESS',type + '_FAIL']
    return requestConfigs
}

export async function getIdentity(){
    try{
        let identity = await global.storage.load({
            key: 'identity',
            autoSync: false,
        })
        if (identity && identity.auth_key) {
            //Object.assign(config.params,{token:identity.auth_key})
        }
    }catch (err) {
        
    }
}

export function setIdentity(identity){
    global.storage.save({
        key  : 'identity',
        data : identity,
        expires : null,
    })
}

export function arrayToObj(array,key){
    if (!Array.isArray(array)) {
        return {}
    }
    let _obj = {}
    for (var i = 0; i < array.length; i++) {
        if (!array[i][key]) continue
        _obj[array[i][key]] = array[i]
    }
    return _obj
}


