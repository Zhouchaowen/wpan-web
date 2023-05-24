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


module.exports = [
    userList,
    loginInfo
]