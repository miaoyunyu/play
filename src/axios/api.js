import fetch from './fetch' // 引用fetch.js


// 甘特图初始化
export function initGantt(projectId) {
    return fetch({
        url: `projects/gantt_chart/${projectId}`,
        method: 'get',
    })
}




// export function $post(url, params) {
//     return fetch({
//         url: url,
//         method: 'post', // 请求方法
//         data: params
//     })
// }

// function $get(url, params) {
//     return fetch({
//         url: url,
//         method: 'get', // 请求方法
//         params: params
//     })
// }

// function $put(url, params) {
//     return fetch({
//         url: url,
//         method: 'put', // 请求方法
//         data: params
//     })
// }

// function $delete(url, params) {
//     return fetch({
//         url: url,
//         method: 'delete', // 请求方法
//         params: params
//     })
// }