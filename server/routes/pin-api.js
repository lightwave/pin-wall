'use strict';

const wallController = require('../controllers/wall');
const pinController = require('../controllers/pin');

function isAuthenticated(req, res, next) {
  if (!req.user) {
    res.sendStatus(403);
  } else {
    // TODO: Validate access code
    next();
  }
}

module.exports = (express, expressApp, nextApp) => {

  if (express === null || expressApp === null) {
    throw new error('expressApp option must be an express server instance');
  }

  // URL rewrite
  expressApp.get('/user/:userId/wall', (req, res) => {
    const actualPage = '/user-wall';
    const queryParams = { userId: req.params.userId };
    nextApp.render(req, res, actualPage, queryParams);
  });

  expressApp.get('/img/:hash', pinController.resolveTinyUrl);

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

  // POST /api/pin
  // Add new pin/link
  router.post('/pin', pinController.create);

  // DELETE /api/pin/:id
  // Add new pin/link
  router.delete('/pin/:id', pinController.delete);
};

