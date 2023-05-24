// 模块名
export const pathTitle = {
    login: '登录',
    dashboard: '使用情况',
    allFiles: '全部文件',
    myDocument: '我的文档',
    myPic: '我的图像',
    myVideo: '我的视频',
    myAudio: '我的音频'
}

// 接口
const moduleFiles = require.context('./modules', false, /\.js$/);
let apis = {};

moduleFiles.keys().forEach(key => {
    // 获取文件名，将 ./ 和 .js 替换为空， 最终格式  common
    const fileName = key.replace(/(\.\/|\.js)/g, '');
    // 填充数据
    apis[fileName] = moduleFiles(key);
})

export default {
    ...apis
}
