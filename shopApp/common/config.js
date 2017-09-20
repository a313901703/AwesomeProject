'use strict'

export const baseUrl = 'http://www.dev.com/api/v1/';

var _config = {
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
    },
    api:{
        joinPayCart: baseUrl +'goods/joinpaycart.html',
    }
}
export const config = _config;