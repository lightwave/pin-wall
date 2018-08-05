'use strict';

const Repo = require('../repositories/pin');
const repo = new Repo();

exports.create = repo.create;
exports.delete = repo.delete;
