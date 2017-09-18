'use strict'

var api = 'api/v1/';

var _config = {
    header:{
        method:'post',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }

    },
    api:{
        //base2:'http://rap.taobao.org/mockjs/9398/',
        base:'http://10.0.2.2/yii2Shop/advanced/frontend/web/',
        goods: api + 'goods.html',
        recommend:api + 'goods/recommend.html',
        
        goodsHome:'api/goods/home',
        creation:"api/creation",
        up:"api/up",
        comment:"api/comments",
        signup:'api/u/signup',
        verify:'api/u/verify',
        signature:'api/signature',
        update:'api/u/update',
    }
}
export const config = _config;