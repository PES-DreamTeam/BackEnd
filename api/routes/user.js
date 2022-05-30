const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');

const factory = Factory();
const usersController = factory.createUsersController();
const userService = factory.createUserService();
const my_auth = auth(userService);
const adminAuth = auth(userService, true);

// api/users
router.get('/', my_auth, usersController.getAll);

// api/users/:id
router.get('/:id', my_auth, usersController.getById);

// api/users/:id/profilePicture
router.post('/:id/profilePicture', my_auth, usersController.setProfilePicture);

// api/users/:id/lastMessage
router.post('/:id/lastMessage', my_auth, usersController.setLastMessage);

// api/users/:id/vehicleConfig
router.get('/:id/vehicleConfig', my_auth, usersController.getVehicleConfig);

// api/users/:id/vehicleConfig
router.post('/:id/vehicleConfig', my_auth, usersController.setVehicleConfig);

// api/users/:id/vehicleConfig/:numberPlate
router.delete('/:id/vehicleConfig/:numberPlate', my_auth, usersController.deleteVehicleConfig);

// api/users
router.put('/', my_auth, usersController.updateUser);

// api/users/:id
router.delete('/:id', my_auth, usersController.deleteUser)

// api/users/bike
router.get('/bike/all', my_auth, usersController.getBike);

// api/users/:id/favourites
router.put('/:id/favourites', my_auth, usersController.setFavourites);

// api/users/:id/favourites
router.get('/:id/favourites', my_auth, usersController.getFavourites);

// api/users/:id/achievements
router.put('/:id/achievements', my_auth, usersController.setAchievement);

// api/users/:id/achievements
router.get('/:id/achievements', my_auth, usersController.getAchievements);

// api/users/:id/likes
router.get('/:id/likes', my_auth, usersController.getLikes);

// api/users/banUser/:id
router.post('/banUser/:id', adminAuth, usersController.banUser);

module.exports = router;
