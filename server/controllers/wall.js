'use strict';

const wallInteractor = require('../interactors/wall');

// GET /api/user/:id/pins
exports.getUserPins = async (req, res) => {
  try {
    const userId = req.params.id;
    const { startCursor } = req.query;

    let pageSize = parseInt(req.query.pageSize);

    if (isNaN(pageSize)) {
      pageSize = undefined;
    }

    const pins = await wallInteractor.getUserPins(userId, pageSize, startCursor);
    res.json(pins);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUserWallInfo = async (req, res) => {
  try {
    const userWallInfo = await wallInteractor.getUserWallInfo();
    res.json(userWallInfo);
  } catch (err) {
    res.status(500).send(err);
  }
};

