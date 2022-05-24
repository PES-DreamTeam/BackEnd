const user = {
        "_id": "test id",
        "name": "test",
        "password": "test",
        "email": "test@test.com",
        "isNew": true,
        "favourites": [],
        "likes": [],
        "profilePicture": "",
        "reports": [],
        "achievements": [],
        "currentVehicle": 0,
        "banned": false,
        "isAdmin": false
    }

const vehicleConfig = {
    "_id": "62363d8999485c0de1ec2d02",
    "user_id": "621a5a5ad828d1275d81f818",
    "brand": "Tesla",
    "model": "1",
    "color": "pink",
    "nickname": "Rashgaron",
    "numberPlate": "AYUDA",
    "__v": 0
}

const expectedUserWithoutVehicleConfig = {
    _id: 'test id',
    nickname: "test",
    email: 'test@test.com',
    vehicleConfig: [],
    isNew: true,
    likes: [],
    reports: [],
    profilePicture: "",
    favourites: [],
    achievements: [],
    currentVehicle: 0,
    banned: false,
    isAdmin: false
}

const expectedUserWithVehicleConfig = {
    _id: 'test id',
    nickname: "test",
    email: 'test@test.com',
    vehicleConfig: [{
    _id: '62363d8999485c0de1ec2d02',
    user_id: '621a5a5ad828d1275d81f818',
    brand: 'Tesla',
    model: '1',
    color: 'pink',
    nickname: 'Rashgaron',
    numberPlate: 'AYUDA',
    __v: 0
    }],
    isNew: true,
    likes: [],
    reports: [],
    profilePicture: "",
    favourites: [],
    achievements: [],
    currentVehicle: 0,
    banned: false,
    isAdmin: false
}

module.exports = {
    expectedUserWithVehicleConfig,
    expectedUserWithoutVehicleConfig,
    user,
    vehicleConfig
}