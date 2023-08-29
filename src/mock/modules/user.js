const loginInfo = {
    url: "/user/login",
    type: "get",
    response: () => {
        return {
            code: 200,
            data: [
                {
                    "id": 1,
                    "username": "admin",
                    "password": "123456"
                }
            ]
        }
    }
}
const userList = {
    url: "/user/list",
    type: "post",
    response: () => {
        return {
            code: 200,
            data: [
                {
                    "id": 1,
                    "username": "zhoujielun",
                    "password": "123456"
                },
                {
                    "id": 2,
                    "username": "guojingming",
                    "password": "666666"
                },
            ]
        }
    }
}

const list = {
    url: "/api/user/folder/0",
    type: "get",
    response: () => {
        return {
            code: 200,
            data: {
                "folders": [{
                    "created_at": "2022-7-17 12:22:00",
                    "name": "文件夹1",
                    "expand": '-',
                    "type": '0',
                    "size": '-',
                    "download": ''
                },{
                    "created_at": "2022-7-17 12:22:00",
                    "name": "文件夹2",
                    "expand": '-',
                    "type": '0',
                    "size": '-',
                    "download": ''
                }],
                "files": [{
                    "created_at": "2022-7-17 12:22:00",
                    "file_name": "啦啦啦1",
                    "expand": 'png',
                    "type": '1',
                    "size": '-',
                    "download": ''
                },{
                    "created_at": "2022-7-17 12:22:00",
                    "file_name": "啦啦啦2",
                    "expand": 'mp4',
                    "type": '3',
                    "size": '-',
                    "download": ''
                },{
                    "created_at": "2022-7-17 12:22:00",
                    "file_name": "啦啦啦3",
                    "expand": 'mp3',
                    "type": '4',
                    "size": '-',
                    "download": ''
                },{
                    "created_at": "2022-7-17 12:22:00",
                    "name": "啦啦啦4",
                    "expand": 'xlx',
                    "type": '2',
                    "size": '-',
                    "download": ''
                }]
            }
        }
    }
}


module.exports = [
    userList,
    loginInfo,
    list
]