const router = require('express').Router();
const userHandler = require('../handlers/userHandler.js');
const eventHandler = require('../handlers/eventHandler.js');
//create and require a match handler
const matchesHandler = require('../handlers/matchesHandler.js');

router.post('/user', userHandler.signUpUser);
router.get('/user', userHandler.getUser);
router.put('/user', userHandler.updateUser);

router.get('/events', eventHandler.getEvents);
router.post('/events', eventHandler.postEvent);
router.put('/events', eventHandler.updateEvent);

router.get('/user/events', eventHandler.getSingleEvent);

//add more routes to handle matches
router.get('/matches', matchesHandler.getMatches);
router.post('/matches', matchesHandler.updateMatches);

module.exports = router;