export const ROUTERS = 'routers';
export const MODAL   = 'modal';

export function routers(routeName,params = {}){
    return { type:ROUTERS,routeName:routeName,params:params}
}

export function modal(visible = true){
    return { type : MODAL,visible }
}

export function joinCart(productid){
    return (dispatch,getState) => {
        if (shouldFetch(getState())) {
            return dispatch(joining(productid));
        }
        console.log('false')
    }
}

function shouldFetch(state){
    const shoppingCart = state.shoppingCart
    if (shoppingCart.isFetching) {
        return false
    }
    return true
}

export function requestPosts() {
    return {
        type: 'joining',
    };
}

function receivePosts(data={}){
    data = [{'id':1,'name':'test'}]
    return {
        type : 'recive',
        data: data,
    }
}
function joining(productid){
    return dispatch => {
        dispatch(requestPosts())
        return dispatch({type:'join',productid})
    }
}
