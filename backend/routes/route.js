const express = require('express');
const router = express.Router();

const { register, login, isAuthenticated } = require('../middlewares/auth');
const { addFriend, getFriends } = require('../controllers/friend-controller');
const { saveMessage, getMessages } = require('../controllers/message-controller');
const { createUser, getUser, findUser } = require('../controllers/user-controller');
const { sendFriendRequest, getFriendRequests, updateFriendRequest } = require('../controllers/friendship-controller')

router.route('/api/create-user').post(createUser);
router.route('/api/get-user').get(getUser);

router.route('/api/signup').post(register);
router.route('/api/signin').post(login);

router.route('/api/search').get(findUser);
router.route('/api/add-friend').post(/*isAuthenticated,*/ addFriend);
router.route('/api/get-friends').get(isAuthenticated, getFriends);

router.route('/api/get-friend-requests').get(isAuthenticated, getFriendRequests);
router.route('/api/send-friend-request').post(isAuthenticated, sendFriendRequest);
router.route('/api/update-friend-request').post(isAuthenticated, updateFriendRequest);

router.route('/api/messages/save-message').post(saveMessage);
router.route('/api/get-messages/messages').get(getMessages);

module.exports = router;