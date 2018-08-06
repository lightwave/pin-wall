'use strict';

const Repo = require('../repositories/pin');
const repo = new Repo();
const atob = require('atob');

exports.create = repo.create;
exports.delete = repo.delete;

exports.resolveTinyUrl = async (hash) => {
  const pinId = atob(hash);
  const pin = await repo.findById(pinId);
  return pin.sourceUrl;
};
