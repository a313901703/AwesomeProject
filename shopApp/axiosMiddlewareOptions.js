import { getResopnseData } from './components/common/func.js'
import { Toast } from 'antd-mobile';

//export const returnRejectedPromiseOnError = true;

export const onComplete = (({ action, dispatch}) => {
    if (action.error) {
        console.log(action)
        let error = action.error
        let message = ''
        if (error.response.status >= 500) {
            message = '服务器异常'
        }else if(error.response.status > 400 ){
            message = '请求错误'
        }else{
            message = getResopnseData(action)
        }
        Toast.fail(message,2);
        console.log('error message: ' + message)
    }
})