/**
 * reactNative redux action test
 * https://github.com/facebook/react-native
 * @flow
 */

/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

//request
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';



/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
}

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  };
}

export function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

export function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function fetchPosts(reddit) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式参给函数，
  // 以此来让它自己也能 dispatch action。

  return function (dispatch) {

    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(requestPosts(reddit));

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。

    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但是我们的一个约定。

    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json =>

        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。

        dispatch(receivePosts(reddit, json))
      );

      // 在实际应用中，还需要
      // 捕获网络请求的异常。
  };
}
