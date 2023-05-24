import request from '@/utils/request'
export function getList(data) {
    return request({
        url: '/user/list',
        method: 'post',
        data: data
    })
}
export function doLogin() {
    return request({
        url: '/user/login',
        method: 'get'
    })
}

// 根据rootId查询文件夹和文件
export function getFolder(rootId) {
    return request({
        url: '/api/user/folder/'+rootId
    })
}

//上传文件
export function uploadFile(data) {
    return request({
        url: '/api/user/file',
        method: 'post',
        data
    })
}
