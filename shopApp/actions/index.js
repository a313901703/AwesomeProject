export const ROUTERS = 'routers';
export const MODAL   = 'modal';

export function routers(routeName,params = {}){
    return { type:ROUTERS,routeName:routeName,params:params}
}

export function modal(visible = 'show'){
    return { type : MODAL,visible}
}