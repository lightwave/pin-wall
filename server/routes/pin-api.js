'use strict';

const Repo = require('../repositories/pin');
const Pin = require('../models/pin');

const repo = new Repo();

const wallController = require('../controllers/wall');

module.exports = (express, expressApp, nextApp) => {

  if (express === null || expressApp === null) {
    throw new error('expressApp option must be an express server instance');
  }

  // Configure router for pin-wall API
  const router = express.Router();
  expressApp.use('/api', router);

  // GET /api/wall
  //
  // Return an array of {
  //   _id: "<user id>",
  //   coverImageUrl: <imageURL for wall cover>,
  //   count: # of pins user has
  // }
  router.route('/wall').get(wallController.getUserWallInfo);

  // GET /api/user/:id/pins
  //
  // Return an array of pins for a user
  router.route('/user/:id/pins').get(wallController.getUserPins);
};

