import * as t from './actions.js'

export function contDown(state,action){
    switch(action.type){
        case t.COUNT_DOWN_BEGIN:
            return state
        default :
            return state;
    }
}

const initLoginForm = {
    phoneNums:'',
    code:'',
    validatePhone:false,
    validateCode:false,
}
export function loginForm(state = initLoginForm,action){
    switch(action.type){
        case t.INIT:
            return initLoginForm;
        case t.CHANGE_TEXT:
            return Object.assign({},state,{
                phoneNums:action.text,
                validatePhone:action.validatePhone,
            })
        case t.CHANGE_CODE:
            return Object.assign({},state,{
                code:action.text,
                validateCode:action.validateCode,
            })
        default :
            return state;
    }
}