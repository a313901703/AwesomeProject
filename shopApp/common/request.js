import React, { Component } from 'react';

import queryString from 'query-string';
import _ from 'lodash';
import Mock from 'mockjs';

//var request = {};
import {config} from './config.js'; 

export function requestGet(url,param){
    if (param) {
        url += '?' + queryString.stringify(param)
    }
    console.log(url)
    return fetch(url)   
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
}

export function requestPost(url,body){
    let options = _.extend(config.header,{
        body:JSON.stringify(body)
    })
    
    return fetch(url,options)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
}