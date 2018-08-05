'use strict';

const Repo = require('../repositories/pin');
const repo = new Repo();

exports.getUserWallInfo = async () => await repo.getUserWallInfo();

