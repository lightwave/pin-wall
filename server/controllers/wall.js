'use strict';

const wallInteractor = require('../interactors/wall');

// GET /api/user/:id/pins
exports.getUserPins = async (req, res) => {
  try {
    const pins = await wallInteractor.getUserPins(req.params.id);
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

